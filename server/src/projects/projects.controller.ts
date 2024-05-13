import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
