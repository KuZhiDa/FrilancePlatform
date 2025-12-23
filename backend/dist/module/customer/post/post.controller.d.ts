import { PostService } from './post.service';
import { PostCreateDto } from './dto/create.dto';
import { PostUpdateDto } from './dto/update.dto';
import { paramsSelectDto } from './dto/params.dto';
import type { Request } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getGlobalPosts(dto: paramsSelectDto, user: Request & {
        user: {
            id_user: number;
            role_user: string;
        };
    }): Promise<import("./dto/return.dto").PostReturnDto[]>;
    getCustomerPosts(id_user: number): Promise<import("./dto/return.dto").PostReturnDto[]>;
    postPost(id: number, dto: PostCreateDto): Promise<{
        id: number;
    }>;
    patchPost(id: number, dto: PostUpdateDto): Promise<{
        message: string;
    }>;
    deletePost(id: number): Promise<{
        message: string;
    }>;
}
