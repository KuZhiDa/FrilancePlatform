import { UsersService } from './users.service';
import { dtoForUpdate } from './dto/dto.update';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getPersonalInfo(id: number): Promise<Object>;
    patchPersonalInfo(id_user: number, body: dtoForUpdate): Promise<{
        message: string;
    }>;
}
