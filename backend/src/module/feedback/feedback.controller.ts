import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dto/create.dto';
import { GetDto } from './dto/get.dto';
import { acceptDto } from './dto/accept.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('')
  async postFeedBack(@Body() dto: FeedbackCreateDto) {
    return await this.feedbackService.createFeedBack(dto);
  }

  @Get('')
  async getFeedBack(@Query() dto: GetDto) {
    return await this.feedbackService.getFeedbacks(dto);
  }

  @Post('accept')
  async acceptFeedback(
    @Body() dto: acceptDto,
    @Query('feedbackId') feedbackId: number,
  ) {
    return await this.feedbackService.acceptFeedback(feedbackId, dto);
  }

  @Delete('reject')
  async rejectFeedback(@Query('feedbackId') feedbackId: number) {
    await await this.feedbackService.rejectFeedback(feedbackId);
  }
}
