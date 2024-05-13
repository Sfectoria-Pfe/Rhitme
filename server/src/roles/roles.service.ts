import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoles(): Promise<Role[]> {
    try {
      return await this.prisma.role.findMany();
    } catch (error) {
      throw new Error('Failed to fetch roles');
    }
  }
}
