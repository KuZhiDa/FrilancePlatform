import { NestFactory } from '@nestjs/core';
import { appModule } from './app.module';
import cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(appModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const newFormExcept = errors.reduce((acc, err) => {
          acc[err.property] = err.constraints;
          return acc;
        }, {});
        return new BadRequestException({ message: newFormExcept });
      },
    }),
  );
  (await app).listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
}
start();
