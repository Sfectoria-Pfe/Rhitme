import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { DepartmentModule } from './department test/department/department.module';
import { MediaModule } from './media/media/media.module';
import { EventModule } from './events/event.module';
import { ReportModule } from './report/report/report.module';
 
@Module({
  imports: [PrismaModule,UserModule,AuthModule,DepartmentModule,MediaModule,EventModule,ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
