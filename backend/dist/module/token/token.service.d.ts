import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/model/model.token';
import { dtoForProof } from './dto/dto.proof';
export declare class TokenService {
    private refreshTokenModel;
    private jwt;
    constructor(refreshTokenModel: typeof RefreshToken, jwt: JwtService);
    createToken(person: object, secret: string, time: string): Promise<string>;
    proofToken(token: string, secret: string, flag: boolean): Promise<dtoForProof>;
    refreshUpdate(tokenRefresh: string): Promise<string | undefined>;
}
