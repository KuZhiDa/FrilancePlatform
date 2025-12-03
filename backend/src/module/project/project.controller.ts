import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetDto } from './dto/get.dto';
import { PatchDto } from './dto/patch.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('')
  async getProject(@Query() dto: GetDto) {
    return this.projectService.allProjectUser(dto);
  }

  @Patch('')
  async updateProjectOptions(
    @Query('projectId') projectId: number,
    @Body() body: PatchDto,
  ) {
    if (body.rating) {
      return this.projectService.updateStatusAccepted(projectId, body.rating);
    } else if (body.deadlineDate) {
      return this.projectService.updateDeadlineDate(
        projectId,
        body.deadlineDate,
      );
    } else {
      return this.projectService.updateStatusStopped(projectId);
    }
  }
}
