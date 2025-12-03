import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from 'src/model/users/image.model';
import { User } from 'src/model/users/users.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    SequelizeModule.forFeature([Images, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const typeImage = file.originalname.split('.')[1];
          const origName = file.originalname.split('.')[0];
          const nameImage = Date.now() + '-' + origName + '.' + typeImage;
          cb(null, nameImage);
        },
      }),
    }),
  ],
  exports: [ImageService],
})
export class ImageModule {}
