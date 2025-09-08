import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
//since we are not specifying a route, this will be the root route
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
