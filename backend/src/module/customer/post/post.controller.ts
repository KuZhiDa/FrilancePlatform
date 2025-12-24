import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/create.dto';
import { PostUpdateDto } from './dto/update.dto';
import { paramsSelectDto } from './dto/params.dto';
import { JwtAccessAuthGuard } from 'src/common/guard/guard.jwt';
import type { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Get('global')
  async getGlobalPosts(
    @Query() dto: paramsSelectDto,
    @Req() user: Request & { user: { id_user: number; role_user: string } },
  ) {
    return await this.postService.getListPost(dto, user.user);
  }

  @Get('customer/:id')
  async getCustomerPosts(@Param('id') id_user: number) {
    return await this.postService.getInfoPost(id_user);
  }

  @Post('customer/:id')
  async postPost(@Param('id') id: number, @Body() dto: PostCreateDto) {
    return await this.postService.addPost(id, dto);
  }

  @Patch('customer/:id')
  async patchPost(@Param('id') id: number, @Body() dto: PostUpdateDto) {
    return await this.postService.updatePost(id, dto);
  }

  @Delete('customer/:id')
  async deletePost(@Param('id') id: number) {
    return await this.postService.deletePost(id);
  }
}
