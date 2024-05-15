import { Module } from '@nestjs/common';
import { EmployeeController } from './user.controller';
import { EmployeeService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
