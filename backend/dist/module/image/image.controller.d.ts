import { ImageService } from './image.service';
export declare class ImageController {
    private imageService;
    constructor(imageService: ImageService);
    postImage(file: Express.Multer.File, req: Request & {
        user: {
            id_user: number;
            role_user: string;
        };
    }): Promise<{
        avatar_name: string;
    }>;
}
