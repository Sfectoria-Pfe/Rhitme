import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const {
        title,
        description,
        start,
        end,
        revenue,
        manager,
        client,
        delivered,
      } = createProjectDto;

      return this.prisma.project.create({
        data: {
          title,
          description,
          start: new Date(start),
          end: new Date(end),
          revenue,
          manager: { connect: { employee_id: manager } },
          client,
          delivered,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const {
      title,
      description,
      start,
      end,
      revenue,
      manager,
      client,
      delivered,
    } = updateProjectDto;

    return this.prisma.project.update({
      where: { project_id: id },
      data: {
        title,
        description,
        start: new Date(start),
        end: new Date(end),
        revenue,
        manager: { connect: { employee_id: manager } },
        client,
        delivered,
      },
    });
  }

  async deleteProject(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { project_id: id },
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: { tasks: true, manager: true },
    });
  }

  async getProjectById(id: string): Promise<Project> {
    return this.prisma.project.findUnique({
      where: { project_id: id },
      include: { tasks: true, manager: true },
    });
  }
}
