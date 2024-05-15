import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyCheckService {
  constructor(private prisma: PrismaService) {}

  @Cron('0 19 * * *')
  async dailyCheck(): Promise<void> {
    const employees = await this.prisma.employee.findMany();

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (const employee of employees) {
      if (!employee.last_opened || employee.last_opened < today) {
        await this.addAbsence(employee.employee_id, today);
      } else {
        await this.addPoints(employee.employee_id, today.getMonth());
      }

      await this.addAbsenceInCurrentMonth(
        employee.employee_id,
        today.getMonth(),
      );
    }
  }

  private async addAbsence(employeeId: string, date: Date): Promise<void> {
    await this.prisma.absence.create({
      data: {
        date,
        justificated: false,
        employee: { connect: { employee_id: employeeId } },
      },
    });
  }

  private async addPoints(
    employeeId: string,
    monthIndex: number,
  ): Promise<void> {
    const year = await this.prisma.year.findFirst({
      where: {
        employee_id: employeeId,
        year: new Date().getFullYear().toString(),
      },
    });

    if (year) {
      const monthlyPoints = [...year.monthly_points];
      monthlyPoints[monthIndex] += 30;

      await this.prisma.year.update({
        where: { year_id: year.year_id },
        data: { monthly_points: { set: monthlyPoints } },
      });
    }
  }

  private async addAbsenceInCurrentMonth(
    employeeId: string,
    monthIndex: number,
  ): Promise<void> {
    const year = await this.prisma.year.findFirst({
      where: {
        employee_id: employeeId,
        year: new Date().getFullYear().toString(),
      },
    });

    if (year) {
      const monthlyAbsences = [...year.monthly_absences];
      monthlyAbsences[monthIndex] += 1;

      await this.prisma.year.update({
        where: { year_id: year.year_id },
        data: { monthly_absences: { set: monthlyAbsences } },
      });
    }
  }
}
