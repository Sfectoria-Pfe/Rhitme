import { Body, Controller, Param, Patch } from '@nestjs/common';
import { AbsenceService } from './absence.service';

@Controller('absences')
export class AbsenceController {
  constructor(private updateAbsenceService: AbsenceService) {}

  @Patch(':absenceId')
  async updateAbsence(
    @Param('absenceId') absenceId: string,
    @Body('justificated') justificated: boolean,
  ): Promise<void> {
    await this.updateAbsenceService.updateAbsence(absenceId, justificated);
  }
}
