import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employees, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

@Injectable()
@ApiTags('auth')
export class AuthService {
    constructor(private prisma: PrismaService) {}

    @ApiOperation({ summary: 'User login' })
    @ApiBody({ description: 'User email and password', type: Object })
    @ApiOkResponse({ description: 'User logged in successfully', type: AuthDto })
    @ApiBadRequestResponse({ description: 'Invalid email or password' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async login(credentials: { email: string, password: string }): Promise<{ role: Role ,user: Employees, token: string }> {
        const { email, password } = credentials;

        const user = await this.prisma.employees.findFirst({
            where: { email: email },
            include:{role:true},
        });

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const token = jwt.sign({ userId: user.user_id , role:user.role}, '7XKEMX3YN4E4H', { expiresIn: '3h' });

        return { user, token,role };
    }
}