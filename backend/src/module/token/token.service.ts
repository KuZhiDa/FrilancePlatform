import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/model.token';
import { dtoForProof } from './dto/dto.proof';
import { secretKey } from 'src/constant/secret';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
		private jwt: JwtService
	) {}

	async createToken(person: object, secret: string, time: string) {
		const token = await this.jwt.signAsync(person, { secret, expiresIn: time })
		return token
	}

	async proofToken(token: string, secret: string, flag: boolean): Promise<dtoForProof> {
		try {
            let result: dtoForProof
            if(flag){
                result = await this.jwt.verifyAsync(token, { secret, ignoreExpiration: true })
            }
            else{
                result = await this.jwt.verifyAsync(token, { secret })
            }
			return result
		} catch (err) {
			throw err
		}
	}

    async refreshUpdate(req: any){
        const tokenRefresh = req.cookies.token
        try{
            if(!tokenRefresh){
                throw new HttpException('Refresh токена нет.', HttpStatus.UNAUTHORIZED)
            }
            const {id_user, role_user } = await this.proofToken(tokenRefresh, secretKey.secretRefresh, false)
            const tokenAccess = await this.createToken({ id_user: id_user, role_user: role_user }, secretKey.secretAccess, '1h')
            return tokenAccess
        }catch(err){
            if(err.name === 'TokenExpiredError'){
                const {id, id_user} = await this.proofToken(tokenRefresh, secretKey.secretRefresh, true)
                await this.refreshTokenModel.destroy({where: {id: id, id_user: id_user}})
                throw new HttpException('Срок действия Refresh токена истек.', HttpStatus.UNAUTHORIZED)
            }else if(err.name === 'JsonWebTokenError'){
                throw new HttpException('Refresh токен не верный.', HttpStatus.UNAUTHORIZED)
            }
            throw err
        }
    }
}
