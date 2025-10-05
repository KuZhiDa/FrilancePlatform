import { DtoForReturn } from 'src/dto/dto.return';
import { User } from 'src/model/model.user';
import { dtoForUpdate } from './dto/dto.update';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: typeof User);
    getUser(id: number): Promise<DtoForReturn>;
    updateUser(dto: dtoForUpdate, id: any): Promise<dtoForUpdate>;
}
