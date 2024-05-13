import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectModule {}
