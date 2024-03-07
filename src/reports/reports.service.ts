import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateReportDto): Promise<Report> {
    return await this.prismaService.report.create({ data });
  }
}
