import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/model.token';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [JwtModule, SequelizeModule.forFeature([RefreshToken])],
  exports: [TokenService]
})
export class TokenModule {}
