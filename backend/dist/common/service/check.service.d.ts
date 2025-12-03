import { User } from 'src/model/users/users.model';
export declare class CheckService {
    private userModel;
    constructor(userModel: typeof User);
    user(id_user: number): Promise<User>;
}
