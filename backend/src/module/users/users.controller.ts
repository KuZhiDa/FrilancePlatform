import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { dtoForUpdate } from './dto/dto.update';
import { JwtAccessAuthGuard } from 'src/common/guard/guard.jwt';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Get('info/:id')
  async getPersonalInfo(@Param('id') id: number) {
    return await this.usersService.getInfo(id);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Patch('update-info/:id')
  async patchPersonalInfo(
    @Param('id') id_user: number,
    @Body(new ValidationPipe()) body: dtoForUpdate,
  ) {
    return await this.usersService.updateInfo(id_user, body);
  }
}
