import { ProfileService } from './profile.service';
import { DtoProfile } from './dto/profile.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(id_user: number): Promise<import("../../../model/executor/profiles.model").ProfilesExecutor | {
        message: string;
    }>;
    postProfile(id_user: number, body: DtoProfile): Promise<import("../../../model/executor/profiles.model").ProfilesExecutor>;
    patchProfile(id_user: number, body: DtoProfile): Promise<import("../../../model/executor/profiles.model").ProfilesExecutor | null>;
    deleteProfile(id_user: number): Promise<{
        message: string;
    }>;
}
