import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/:id')
  async getHello(@Param('id') test: string) {
    console.log(test);
    return test;
  }
  @Post('/body')
  async getBody(@Headers() test: any) {
    console.log(test);
    return test;
  }
}
