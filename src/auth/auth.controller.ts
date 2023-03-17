import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './Dtos/CreateUser.Dto';
import { LoginUserDto } from './LoginUser.Dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
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

  @Post('register')
  Create(@Body() createUserDto: CreateUserDto) {
    return this.authService.Create(createUserDto);
  }
}
