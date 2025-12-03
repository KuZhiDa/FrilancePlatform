import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(person: {
        id_user: string;
        role_user: string;
    }): Promise<{
        id_user: string;
        role_user: string;
    }>;
}
export {};
