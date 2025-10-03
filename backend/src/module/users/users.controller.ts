import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAccessAuthGuard } from 'src/guard/guard.jwt';
import { dtoForUpdate } from './dto/dto.update';
import { Role } from 'src/decorators/decorator.role';
import { Roles } from 'src/constant/enumRoles';
import { RolesGuard } from 'src/guard/guard.roles';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAccessAuthGuard, RolesGuard)
	@Role(Roles.Executor)
	@Get('personAcc/:id')
	async getPersonalAccount(@Param('id') id: number) {
		return this.usersService.getUser(id)
	}

	@UseGuards(JwtAccessAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch('personAcc/:id')
	async patchPersonalAccount(@Body() body: dtoForUpdate, @Param('id') id: number) {
		return this.usersService.updateUser(body, id)
	}

}
