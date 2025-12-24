import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/users/users.model';
import { RefreshToken } from './model/users/token.model';
import { AuthModule } from './module/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/strategy/strategy.jwt';
import { JwtAccessAuthGuard } from './common/guard/guard.jwt';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './module/email/email.module';
import { TokenModule } from './module/token/token.module';
import { PasswordRecoveryModule } from './module/password_recovery/pas_recovery.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ProjectModule } from './module/project/project.module';
import { orderProject } from './model/users/project.model';
import { ImageModule } from './module/image/image.module';
import { Images } from './model/users/image.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WorkInfoExecutor } from './model/executor/work_Info/work_info.model';
import { ProjectExecutor } from './model/executor/work_Info/projects.model';
import { ProfilesExecutor } from './model/executor/profiles.model';
import { ProfileModule } from './module/executor/profile/profile.module';
import { WorkInfoModule } from './module/executor/work-info/work-info.module';
import { CommonModule } from './common/common.module';
import { CustomerPost } from './model/customer/post.model';
import { PostModule } from './module/customer/post/post.module';
import { FeedBack } from './model/users/feedback.model';
import { FeedbackModule } from './module/feedback/feedback.module';

@Module({
  providers: [JwtStrategy, JwtAccessAuthGuard],
  imports: [
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/avatar',
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_LOGIN,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      models: [
        User,
        ProjectExecutor,
        WorkInfoExecutor,
        RefreshToken,
        orderProject,
        Images,
        ProfilesExecutor,
        CustomerPost,
        FeedBack,
      ],
      sync: {
        force: true,
      },
      autoLoadModels: true,
    }),
    EmailModule,
    TokenModule,
    PasswordRecoveryModule,
    ProjectModule,
    ImageModule,
    ProfileModule,
    WorkInfoModule,
    PostModule,
    FeedbackModule,
  ],
})
export class appModule {}
