import { Model } from 'sequelize-typescript';
import { User } from './users.model';
interface interfaceForToken {
    id_user: number;
    token: string;
}
export declare class RefreshToken extends Model<RefreshToken, interfaceForToken> {
    id_user: number;
    token: string;
    tokenUser: User;
}
export {};
