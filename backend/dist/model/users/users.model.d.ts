import { Model } from 'sequelize-typescript';
import { RefreshToken } from './token.model';
import { orderProject } from './project.model';
import { Images } from './image.model';
import { ProfilesExecutor } from '../executor/profiles.model';
import { WorkInfoExecutor } from '../executor/work_Info/work_info.model';
import { FeedBack } from '../users/feedback.model';
import { CustomerPost } from '../customer/post.model';
interface userInterface {
    username: string;
    email: string;
    phoneNumber?: string;
    password: string;
    is2Fa: boolean;
}
export declare class User extends Model<User, userInterface> {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    isActivate: boolean;
    is2Fa: boolean;
    rating_count: number;
    rating_sum: number;
    refreshToken: RefreshToken[];
    projectAsExecutor: orderProject[];
    projectAsCustomer: orderProject[];
    image: Images;
    profileExecutor: ProfilesExecutor;
    workInfoExecutor: WorkInfoExecutor[];
    feedBack: FeedBack[];
    customerPost: CustomerPost[];
}
export {};
