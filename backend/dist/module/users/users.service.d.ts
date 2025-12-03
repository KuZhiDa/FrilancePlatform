import { User } from 'src/model/users/users.model';
import { dtoForUpdate } from './dto/dto.update';
import { ImageService } from '../image/image.service';
export declare class UsersService {
    private userModel;
    private imageService;
    constructor(userModel: typeof User, imageService: ImageService);
    getInfo(id_user: number): Promise<Object>;
    updateInfo(id_user: number, dto: dtoForUpdate): Promise<{
        message: string;
    }>;
}
