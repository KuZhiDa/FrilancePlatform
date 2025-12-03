import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessAuthGuard } from 'src/common/guard/guard.jwt';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post('add')
  @UseInterceptors(FileInterceptor('avatar'))
  async postImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: { id_user: number; role_user: string } },
  ) {
    const data = {
      url_on_image: file.destination,
      name_image: file.filename,
      id_user: req.user.id_user,
    };
    await this.imageService.setAvatar(data);
    return { avatar_name: data.name_image };
  }
}
