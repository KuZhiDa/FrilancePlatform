import { Model } from 'sequelize-typescript';
import { CustomerPost } from '../customer/post.model';
import { User } from '../users/users.model';
export interface FeedBackInterface {
    postId: number;
    userId: number;
}
export declare class FeedBack extends Model<FeedBack, FeedBackInterface> {
    postId: number;
    userId: number;
    suggestedPrice: number;
    executor: User;
    post: CustomerPost;
}
