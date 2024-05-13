import { Body, Controller,HttpCode,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService){}
    @Post("signin")
    @HttpCode(201)
    signin(@Body() dto: AuthDto){
        return this.authService.login(dto);
    }
}
