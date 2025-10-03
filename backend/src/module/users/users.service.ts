import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoForReturn } from 'src/dto/dto.return';
import { User } from 'src/model/model.user';
import { dtoForUpdate } from './dto/dto.update';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersModel: typeof User){}

    async getUser(id): Promise<DtoForReturn>{
        try{
            const user = (await this.usersModel.findOne({where: {id: id}}))?.dataValues;
            if(!user){
                throw new HttpException('Пользователя с таким id не существует.', HttpStatus.NOT_FOUND)
            }
            const {password, ...data} = user
            return data
        }catch(err){
            throw err
        }
    }

    async updateUser(dto: dtoForUpdate, id){
        try{
            const user = await this.usersModel.findOne({ where: { id: id } })
            if(!user){
                throw new HttpException('Пользователя с таким id не существует.', HttpStatus.NOT_FOUND)
            }
            await this.usersModel.update(dto, {where: {id: id}})
            return dto
        }catch(err){
            throw err
        }
    }
}
