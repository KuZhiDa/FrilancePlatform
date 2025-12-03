import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { DtoProfile } from './dto/profile.dto';
import { Role } from 'src/common/decorators/decorator.role';
import { Roles } from 'src/common/constant/roles';
import { RolesGuard } from 'src/common/guard/guard.roles';
import { JwtAccessAuthGuard } from 'src/common/guard/guard.jwt';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('info/:id')
  async getProfile(@Param('id') id_user: number) {
    return await this.profileService.getInfo(id_user);
  }

  @Post('set-info/:id')
  async postProfile(@Param('id') id_user: number, @Body() body: DtoProfile) {
    return await this.profileService.addInfo(id_user, body);
  }

  @Patch('update-info/:id')
  async patchProfile(@Param('id') id_user: number, @Body() body: DtoProfile) {
    return await this.profileService.updateInfo(id_user, body);
  }

  @Delete('clear-info/:id')
  async deleteProfile(@Param('id') id_user: number) {
    return this.profileService.deleteInfo(id_user);
  }
}
