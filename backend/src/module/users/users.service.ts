import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoForReturn } from 'src/dto/dto.return';
import { User } from 'src/model/model.user';
import { dtoForUpdate } from './dto/dto.update';

@Injectable()
export class UsersService {
    //Конструктор для подключения моделей и провайдеров
    constructor(
        @InjectModel(User) private usersModel: typeof User
    ){}

    //----------Метод реализации получения информации юзера---------------//
    async getUser(id: number): Promise<DtoForReturn>{
        //Поиск юзера
        const user = (await this.usersModel.findOne(
            {where: 
                {id: id}
            }
        ))?.dataValues;

        //Проверка наличия
        if(!user){
            throw new HttpException('Пользователя с таким id не существует.', HttpStatus.NOT_FOUND)
        }
        
        //Если он существует, возврат данных юзера
        const {password, ...data} = user
        return data
    }

    //-------------Метод реализации обновления информации юзера----------//
    async updateUser(dto: dtoForUpdate, id){
        const user = await this.usersModel.findOne({ where: { id: id } })
        if(!user){
            throw new HttpException('Пользователя с таким id не существует.', HttpStatus.NOT_FOUND)
        }
        await this.usersModel.update(dto, {where: {id: id}})
        return dto
    }
}
