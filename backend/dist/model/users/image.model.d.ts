import { Model } from 'sequelize-typescript';
import { User } from './users.model';
interface InterfaceImages {
    id_user: number;
    url_on_image: string;
}
export declare class Images extends Model<Images, InterfaceImages> {
    id_user: number;
    url_on_image: string;
    name_image: string;
    userImage: User;
}
export {};
