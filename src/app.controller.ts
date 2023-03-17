import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './auth/Dtos/CreateUser.Dto';
import { LoginUserDto } from './auth/LoginUser.Dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
   
  @Post('auth/login')
  Login(@Body() loginnUserDto: LoginUserDto) {
    return this.authService.Login(loginnUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('prueba')
  getPrueba(@Request() req) {
    return 'esta es la prueba';
  }

  @Post('auth/register')
  Create(@Body() createUserDto: CreateUserDto) {
    return this.authService.Create(createUserDto);
  }
}
