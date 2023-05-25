import {
  Post,
  Delete,
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from './app.service';
import { SomeGuard } from './guards/some-guard';

@Controller()
@UseGuards(SomeGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
  private lastId = 3;
  private residents = [
    {
      id: '1',
      name: 'Sherlock Holmes',
      email: 'smarty@221b.uk',
    },
    {
      id: '2',
      name: 'John H. Whatson',
      email: 'doctor@221b.uk',
    },
    {
      id: '3',
      name: 'Mrs Hudson',
      email: 'hostess@221b.uk',
    },
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('random')
  getRandom(): string {
    return this.appService.getRandom();
  }

  @Get('yarandom')
  getYaRandom(): any {
    const data: any = this.appService.getYaRandom();
    return `${data.quote} - ${data.author}`;
  }

  @Get('fetch')
  getFetch() {
    const str = this.appService
      .getIsomorphic()
      .then((data) => data.quote + ' - ' + data.author);
    return str;
  }

  @Get('another')
  async getAnotherQuote() {
    const data = this.appService.anotherAttempt();
    const quote = data.pipe(map((data) => data.quote + ' - ' + data.author));
    return quote;
  }

  /* @Get(':id')
  getResidentById(@Param() params: any) {
    for (const resident of this.residents) {
      if (resident.id === params.id) return resident;
    }
    throw new NotFoundException();
  } */

  @Post()
  create(@Body() user: any) {
    this.residents.push({
      id: String(++this.lastId),
      name: user.name,
      email: user.email,
    });
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    this.residents = this.residents.filter((resident) => resident.id !== id);
  }
}
