import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseToSerializable } from 'src/decorators/ResponseToSerializable';
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@ResponseToSerializable<ReportDto>(ReportDto)
@UseInterceptors(ClassSerializerInterceptor)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Post()
  @UseGuards(SessionAuthGuard)
  async create(@Body() body: CreateReportDto): Promise<ReportDto> {
    return await this.reportsService.create(body);
  }
}
