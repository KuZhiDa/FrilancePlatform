import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { FeedBack } from '../users/feedback.model';
interface CustomerPostInterface {
    id_user: number;
    projectName: string;
    description: string;
    price: number;
}
export declare class CustomerPost extends Model<CustomerPost, CustomerPostInterface> {
    id: number;
    id_user: number;
    projectName: string;
    description: string;
    price: number;
    feedBack: FeedBack[];
    user: User;
}
export {};
