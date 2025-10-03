import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { TokenService } from '../token/token.service';
import { secretKey } from 'src/constant/secret';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(@InjectModel(User) private userModel: typeof User, private token: TokenService, private nodemailer: MailerService){}

    async updateIsActivate(tokenEmail: string){
        try{
            const person = await this.token.proofToken(tokenEmail, secretKey.secretEmail, false)
            const user = (await this.userModel.findOne({where: {id: person.id_user}}))?.dataValues
            console.log(user);
            if(!user){
                throw new HttpException('Пользователь не найден.', HttpStatus.FORBIDDEN)
            }
            if(user.isActivate){
                throw new HttpException('Email уже подтвержден.', HttpStatus.FORBIDDEN)
            }
            await this.userModel.update({isActivate: true}, { where: { id: person.id_user } })
            return {message: `Email пользователя ${user.username} подтвержден.`}
        }catch(err){
            if(err.name === 'TokenExpiresError'){
                throw new HttpException('Время для подтверждения email истекло.', HttpStatus.FORBIDDEN)
            }
            else if(err.name === 'JsonWebTokenError'){
                throw new HttpException('Токен не валиден.', HttpStatus.FORBIDDEN)
            }
            throw err
        }
    }

    async messageToEmail(to: string, subject: string, text: string){
        if (!process.env.EMAIL_LOGIN) {
			throw new HttpException('Не указана email отправителя.',HttpStatus.FORBIDDEN)
		}
        this.nodemailer.sendMail({from: process.env.EMAIL_LOGIN,to,subject,text})
    }
}
