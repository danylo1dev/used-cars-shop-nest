import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Report } from "./entities/report.entity";
import { User } from "src/users/entities/user.entity";
import { Prisma } from "@prisma/client";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateReportDto, user: User): Promise<Report> {
    return await this.prismaService.report.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
  }
  async createEstimate({ mark, model, lat, lon, year }: GetEstimateDto) {
    const { _avg } = await this.prismaService.report.aggregate({
      _avg: {
        price: true,
      },
      take: 3,
      where: {
        approved: true,
        mark,
        model,
        lat: { lte: lat + 5, gte: lat - 5 },
        lon: { lte: lon + 5, gte: lon - 5 },
        year: { lte: year + 3, gte: year - 3 },
      },
      orderBy: {
        price: "desc",
      },
    });
    return _avg;
  }
  async findUnique(where: Prisma.ReportWhereUniqueInput): Promise<Report> {
    return await this.prismaService.report.findUnique({ where });
  }
  async findUniqueOrThrow(where: Prisma.ReportWhereUniqueInput): Promise<Report | NotFoundException> {
    const report = await this.findUnique(where);
    if (!report) {
      throw new NotFoundException();
    }
    return report;
  }
  async changeApproval(id: number, approved: boolean): Promise<Report> {
    await this.findUniqueOrThrow({ id });
    return await this.prismaService.report.update({
      where: { id },
      data: {
        approved,
      },
    });
  }
}
