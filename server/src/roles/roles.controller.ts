import { Controller, Get } from '@nestjs/common';
import { RoleService } from './roles.service';
import { Role } from '@prisma/client';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles(): Promise<Role[]> {
    return this.roleService.getRoles();
  }
}
