import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { TokenService } from '../token/token.service';
import { secretKey } from 'src/constant/secret';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    //конструктор для подключений провайдеров и моделей
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private token: TokenService, 
        private nodemailer: MailerService
    ){}

    //--------------Метод реализации подтверждения почты-----------------//
    async updateIsActivate(tokenEmail: string): Promise<{message: string}>{
        let person

        //Расшифровка токена с перехватом ошибки
        try{
            person = await this.token.proofToken(tokenEmail, secretKey.secretEmail, false)
        }catch(err){
            if(err.name === 'TokenExpiresError'){
                throw new HttpException('Время для подтверждения email истекло.', HttpStatus.FORBIDDEN)
            }
            else if(err.name === 'JsonWebTokenError'){
                throw new HttpException('Токен не валиден.', HttpStatus.FORBIDDEN)
            }
        }

        //Поиск юзера с такими данными
        const user = (await this.userModel.findOne(
            {where: 
                {id: person.id_user}
            }
        ))?.dataValues

        //Проверка наличия пользователя
        if(!user){
            throw new HttpException('Пользователь не найден.', HttpStatus.FORBIDDEN)
        }

        //Проверка подтверждение было или нет
        if(user.isActivate){
            throw new HttpException('Email уже подтвержден.', HttpStatus.FORBIDDEN)
        }

        //Обновление данных в БД
        await this.userModel.update({isActivate: true}, { where: { id: person.id_user } })

        //Возврат сообщения о подтверждении
        return {message: `Email пользователя ${user.username} подтвержден.`}
    }

    //---------------------Метод для отправки сообщения на почту---------------------//
    async messageToEmail(to: string, subject: string, text: string){
        if (!process.env.EMAIL_LOGIN) {
			throw new HttpException('Не указана email отправителя.',HttpStatus.FORBIDDEN)
		}
        this.nodemailer.sendMail({from: process.env.EMAIL_LOGIN,to,subject,text})
    }
}
