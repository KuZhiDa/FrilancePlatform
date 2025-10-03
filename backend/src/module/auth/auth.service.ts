import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { DtoForReg } from './dto.auth/dto.register';
import * as bcrypt from 'bcrypt'
import { DtoForReturn } from '../../dto/dto.return';
import { Op } from 'sequelize';
import { DtoForLog } from './dto.auth/dto.login';
import { secretKey } from 'src/constant/secret';
import { RefreshToken } from 'src/model/model.token';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
    //Подключение провайдеров и модулей
    constructor(
        @InjectModel(User) private userModel: typeof User, 
        @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
        private token: TokenService, 
        private emailService: EmailService
    ){}

    //------------Метод реализации регистрации------------------//
    async registerUser(dto: DtoForReg): Promise<DtoForReturn> {
        //Проверка на наличие пользователя
        let data
        if(dto.phone_number) {
            data = await this.userModel.findOne({ 
                where: {
                    [Op.or] : [
                        {username: dto.username}, 
                        {email: dto.email}, 
                        {phone_number: dto.phone_number}
                    ]
                }
            })
        }
        else {
            data = await this.userModel.findOne({ 
                where: {
                    [Op.or] : [
                        {username: dto.username}, 
                        {email: dto.email}
                    ]
                }
            })
        }
        if(data){
            throw new HttpException('Пользователь с такими данными уже существует.', HttpStatus.BAD_REQUEST)
        }

        //Обработка результата
        dto.password = await bcrypt.hash(dto.password, 10)
        const result = await this.userModel.create(dto)
        const {password, ...person} = result.dataValues
        const tokenEmail = await this.token.createToken({id_user: person.id}, secretKey.secretEmail, '24h')

        //Отправка подтверждения на почту
        await this.emailService.messageToEmail(dto.email, 'Подтверждение email.', `Подтвердите email перейдя по ссылке: http://localhost:${process.env.PORT}/api/email/proof?token=${tokenEmail}`)
        
        //Возврат данных пользователя на клиент
        return person
    }

    //----------------------------Метод реализации авторизации---------------------------//
    async loginUser(dto: DtoForLog): Promise<{accessToken: string, refreshToken: string}> {
        //Проверка на существование пользователя
        const data = (await this.userModel.findOne(
            {where: 
                {[Op.or]:  [
                    {username: dto.login} , 
                    {email: dto.login}, 
                    {phone_number: dto.login} 
                ]}
            }
        ))?.dataValues
		if(!data){
			throw new HttpException('Пользователя с такими данными не существует.', HttpStatus.BAD_REQUEST)
		}

        //Проверка пароля
		const result = await bcrypt.compare(dto.password, data.password)
		if(!result){
			throw new HttpException('Пароль не верный.', HttpStatus.BAD_REQUEST)
		}

        //Генерация токенов Refresh и Access
        const resultId = (await this.refreshTokenModel.create({id_user: data.id, token: ''})).dataValues.id
        const accessToken = await this.token.createToken({id_user: data.id, role_user: data.role }, secretKey.secretAccess, '1h')
        const refreshToken = await this.token.createToken({id: resultId, id_user: data.id, role_user: data.role }, secretKey.secretRefresh, '30d')
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10)
        await this.refreshTokenModel.update(
            {token: refreshTokenHash}, 
            {where: 
                {id: resultId}
        })

        //Возврат токенов на клиент
        return {accessToken, refreshToken}
    }

    //---------------Метод реализации выхода------------------//
    async logoutUser(refreshToken: string): Promise<{message: string}>{
		let person

		//Проверка наличия refresh токена
		if (refreshToken) {
			//try для перехвата ошибки валидности токена
			try {
				person = await this.token.proofToken(refreshToken,secretKey.secretRefresh,true)
			} catch (err) {
				throw new HttpException('Ошибка валидности refresh токена',HttpStatus.FORBIDDEN)
			}

			//Если токен валиден то удаляем его из базы
			await this.refreshTokenModel.destroy({
				where: {
					[Op.and]: [{ id: person.id }, { id_user: person.id_user }],
				},
			})
            
			//Возврат сообщения клиенту о выходе пользователя
			return { message: 'Пользователь вышел, нужно очистить данные токенов.' }
		}

		//Возврат сообщения клиенту о том, что токена не было
		throw new HttpException('Refresh токена нет.', HttpStatus.FORBIDDEN)
	}
}
