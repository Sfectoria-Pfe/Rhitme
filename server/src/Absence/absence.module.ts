import { Module } from '@nestjs/common';
import { AbsenceController } from './absence.controller';
import { AbsenceService } from './absence.service';

@Module({
  controllers: [AbsenceController],
  providers: [AbsenceService],
  exports: [AbsenceService],
})
export class AbsenceModule {}
