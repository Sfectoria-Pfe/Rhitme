import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly JWT_SECRET = 'sfectoria';

  async authenticate(email: string, password: string): Promise<any> {
    const employee = await this.prisma.employee.findUnique({
      where: { email },
      include: {
        role: true,
        department: true,
        address: true,
      },
    });

    if (!employee) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    await this.prisma.employee.update({
      where: { employee_id: employee.employee_id },
      data: { last_opened: new Date(), status: 'Active' },
    });

    const token = this.generateToken(employee);
    return { employee, token };
  }

  private generateToken(employee: Employee): string {
    return jwt.sign({ employee }, this.JWT_SECRET, { expiresIn: '8h' });
  }
}
