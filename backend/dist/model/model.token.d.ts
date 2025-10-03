import { Model } from "sequelize-typescript";
interface interfaceForToken {
    id_user: number;
    token: string;
}
export declare class RefreshToken extends Model<RefreshToken, interfaceForToken> {
    id_user: number;
    token: string;
}
export {};
