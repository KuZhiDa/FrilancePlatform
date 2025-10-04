import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/model.user";
import { RefreshToken } from "./model/model.token";
import { AuthModule } from "./module/auth/auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/strategy.jwt";
import { JwtAccessAuthGuard } from "./guard/guard.jwt";
import { MiddlewareAuthJwt } from "./middleware/middleware.auth";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./module/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailModule } from './module/email/email.module';
import { TokenModule } from './module/token/token.module';
import { ResetPasswordModule } from './module/auth/reset_password/reset_password.module';


@Module({
	providers: [JwtStrategy, JwtAccessAuthGuard],
	imports: [
		UsersModule,
		AuthModule,
		PassportModule,
		JwtModule,
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		MailerModule.forRoot({
			transport:{
				host: process.env.EMAIL_HOST,
				port: Number(process.env.EMAIL_PORT),
				secure: false,
				auth: {
					user: process.env.EMAIL_LOGIN,
					pass: process.env.EMAIL_PASSWORD
				}
			}
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, RefreshToken],
			autoLoadModels: true,
		}),
		EmailModule,
		TokenModule,
		ResetPasswordModule,
	],
})
export class appModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MiddlewareAuthJwt).forRoutes('/auth/login')
	}
}
