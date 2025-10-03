import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guard/guard.roles';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])]
})
export class UsersModule {}
