import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe, Res, UseGuards, Get, Req, Param, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoForReg } from './dto.auth/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto.auth/dto.login';
import { LoginGuard } from 'src/guard/guard.login';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('reg')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe())
	postRegister(@Body() body: DtoForReg) {
		return this.authService.registerUser(body)
	}

	@UseGuards(LoginGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async postLogin(@Body() body: DtoForLog, @Res({ passthrough: true}) res: Response) {
		const {accessToken, refreshToken} = await this.authService.loginUser(body)
		res.cookie('token', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
		return {message: 'Пользователь вошел в систему.', Access: accessToken}
	}
	
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	postLogout(@Req() req: Request){
		return this.authService.logoutUser(req)
	}
}
