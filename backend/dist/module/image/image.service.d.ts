import { Images } from 'src/model/users/image.model';
import { User } from 'src/model/users/users.model';
import { DtoAddImage } from './dto/add.dto';
export declare class ImageService {
    private imagesModel;
    private userModel;
    constructor(imagesModel: typeof Images, userModel: typeof User);
    getAvatar(id_user: number): Promise<{
        message: string;
        avatar_name?: undefined;
    } | {
        avatar_name: string;
        message?: undefined;
    }>;
    setAvatar(dto: DtoAddImage): Promise<{
        message: string;
    }>;
}
