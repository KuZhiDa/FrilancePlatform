import { CheckService } from 'src/common/service/check.service';
import { CustomerPost } from 'src/model/customer/post.model';
import { PostReturnDto } from './dto/return.dto';
import { PostCreateDto } from './dto/create.dto';
import { PostUpdateDto } from './dto/update.dto';
import { paramsSelectDto } from './dto/params.dto';
import { UserDto } from 'src/common/dto/user.dto';
export declare class PostService {
    private postModel;
    private check;
    constructor(postModel: typeof CustomerPost, check: CheckService);
    getListPost(dto: paramsSelectDto, user: UserDto): Promise<PostReturnDto[]>;
    getInfoPost(id_user: number): Promise<PostReturnDto[]>;
    addPost(id_user: number, dto: PostCreateDto): Promise<{
        id: number;
    }>;
    updatePost(id: number, dto: PostUpdateDto): Promise<{
        message: string;
    }>;
    deletePost(id: number): Promise<{
        message: string;
    }>;
    private checkPost;
}
