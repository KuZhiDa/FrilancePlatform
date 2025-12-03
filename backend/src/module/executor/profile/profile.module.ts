import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { ProfilesExecutor } from 'src/model/executor/profiles.model';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [SequelizeModule.forFeature([User, ProfilesExecutor])],
})
export class ProfileModule {}
