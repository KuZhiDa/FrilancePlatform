import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/model/users/token.model';
import { dtoForProof } from '../../common/dto/dto.proof';
import type { Response } from 'express';
import type { Role } from 'src/common/constant/roles';
export declare class TokenService {
    private refreshTokenModel;
    private jwt;
    constructor(refreshTokenModel: typeof RefreshToken, jwt: JwtService);
    genAccessRefresh(id_user: number, role_user: Role): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    createToken(person: any, secret: string, time: string): Promise<string>;
    proofToken(token: string, secret: string, flag: boolean): Promise<dtoForProof>;
    refreshUpdate(tokenRefresh: string, res: Response): Promise<{
        access: string;
    }>;
}
