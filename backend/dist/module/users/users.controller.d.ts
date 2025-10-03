import { UsersService } from './users.service';
import { dtoForUpdate } from './dto/dto.update';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getPersonalAccount(id: number): Promise<import("../../dto/dto.return").DtoForReturn>;
    patchPersonalAccount(body: dtoForUpdate, id: number): Promise<dtoForUpdate>;
}
