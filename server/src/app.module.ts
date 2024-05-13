import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './user/user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { DepartmentModule } from './department test/department/department.module';
import { RolesModule } from './roles/roles.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyCheckService } from './DailyCheck/dailyCheck.service';
import { AbsenceModule } from './Absence/absence.module';
import { ConversationsModule } from './Conversations/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectModule } from './projects/projects.module';
import { TaskModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { ConnectionGateway } from './user/user/connection.gateway';
import { EmployeeService } from './user/user/user.service';
import { OffersModule } from './offers/offers.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ReportsModule } from './reports/reports.module';
import { ReportReplyModule } from './report-reply/report-reply.module';

@Module({
  imports: [
    PrismaModule,
    DepartmentModule,
    EmployeeModule,
    AuthModule,
    RolesModule,
    ScheduleModule.forRoot(),
    AbsenceModule,
    ConversationsModule,
    MessagesModule,
    ProjectModule,
    TaskModule,
    CommentsModule,
    SubtasksModule,
    OffersModule,
    CandidatesModule,
    ReportsModule,
    ReportReplyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DailyCheckService,
    ConnectionGateway,
    EmployeeService,
  ],
})
export class AppModule {}
