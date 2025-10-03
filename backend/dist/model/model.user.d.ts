import { Model } from "sequelize-typescript";
interface userInterface {
    username: string;
    email: string;
    phone_number?: string;
    password: string;
}
export declare class User extends Model<User, userInterface> {
    username: string;
    role: string;
    email: string;
    phone_number: string;
    from_country: string;
    from_city: string;
    password: string;
    isActivate: boolean;
}
export {};
