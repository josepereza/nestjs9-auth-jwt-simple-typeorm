import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('prueba')
  getPrueba(@Request() req) {
    return 'esta es la prueba';
  }
}
