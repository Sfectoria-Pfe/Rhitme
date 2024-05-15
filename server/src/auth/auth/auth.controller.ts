import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly employeeService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthDto): Promise<any> {
    try {
      const { email, password } = loginDto;
      const result = await this.employeeService.authenticate(email, password);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
