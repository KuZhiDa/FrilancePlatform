import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WorkInfoService } from './work-info.service';
import type { DtoCards } from './dto/cards.dto';
import type { ProjectDto } from './dto/project.dto';

@Controller('work-info')
export class WorkInfoController {
  constructor(private readonly workInfoService: WorkInfoService) {}

  @Get(':id')
  async getPortfolio(@Param('id') id_user: number) {
    return await this.workInfoService.getWorkInfo(id_user);
  }

  @Get('project/:id')
  async getProject(@Param('id') id_card: number) {
    const result = await this.workInfoService.getProject(id_card);
    if (typeof result === 'string') {
      return { message: result };
    }
    return result;
  }

  @Post('card/:id')
  async postCard(@Param('id') id_user: number, @Body() dto: DtoCards) {
    return await this.workInfoService.addCard(id_user, dto);
  }

  @Post('project/:id')
  async postProject(@Param('id') id_card: number, @Body() dto: ProjectDto) {
    dto.id_WorkInfo = id_card;
    return await this.workInfoService.addProject(id_card, dto);
  }

  @Delete('project/:id')
  async deleteProject(@Param('id') id_card: number) {
    return await this.workInfoService.clearProjectInfo(id_card);
  }
}
