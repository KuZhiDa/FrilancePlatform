import { Body, Controller, Post, ValidationPipe, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoForReg } from './dto.auth/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto.auth/dto.login';
import { LoginGuard } from 'src/guard/guard.login';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('reg')
	postRegister(@Body(new ValidationPipe()) body: DtoForReg) {
		return this.authService.registerUser(body)
	}

	@Post('login')
	@UseGuards(LoginGuard)
	async postLogin(@Body() body: DtoForLog, @Res({ passthrough: true}) res: Response) {
		const {accessToken, refreshToken} = await this.authService.loginUser(body)
		res.cookie('token', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
		return {message: 'Пользователь вошел в систему.', Access: accessToken}
	}
	
	@Post('logout')
	postLogout(@Req() req: Request){
		return this.authService.logoutUser(req.cookies.token)
	}
}
