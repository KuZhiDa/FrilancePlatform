import { ProfilesExecutor } from 'src/model/executor/profiles.model';
import { User } from 'src/model/users/users.model';
import { DtoProfile } from './dto/profile.dto';
export declare class ProfileService {
    private userModel;
    private profileModel;
    constructor(userModel: typeof User, profileModel: typeof ProfilesExecutor);
    checkUser(id_user: number): Promise<void>;
    checkProfile(id_user: number): Promise<void>;
    getInfo(id_user: number): Promise<ProfilesExecutor | {
        message: string;
    }>;
    addInfo(id_user: number, dto: DtoProfile): Promise<ProfilesExecutor>;
    updateInfo(id_user: number, dto: DtoProfile): Promise<ProfilesExecutor | null>;
    deleteInfo(id_user: number): Promise<{
        message: string;
    }>;
}
