import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AbsenceService {
  constructor(private prisma: PrismaService) {}

  async updateAbsence(absenceId: string, justificated: boolean): Promise<void> {
    const absence = await this.prisma.absence.findUnique({
      where: { absence_id: absenceId },
    });

    if (!absence) {
      throw new Error('Absence not found');
    }

    const employeeId = absence.employee_id;
    const currentMonth = new Date().getMonth();

    const year = await this.prisma.year.findFirst({
      where: {
        employee_id: employeeId,
        year: new Date().getFullYear().toString(),
      },
    });

    if (!year) {
      throw new Error('Year not found');
    }

    const monthlyPoints = [...year.monthly_points];
    if (justificated) {
      monthlyPoints[currentMonth] += 15;
    } else {
      monthlyPoints[currentMonth] -= 15;
    }

    await this.prisma.absence.update({
      where: { absence_id: absenceId },
      data: { justificated },
    });

    await this.prisma.year.update({
      where: { year_id: year.year_id },
      data: { monthly_points: { set: monthlyPoints } },
    });
  }
}
