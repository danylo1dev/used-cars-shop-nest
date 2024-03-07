import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Report } from "./entities/report.entity";
import { User } from "src/users/entities/user.entity";
import { Prisma } from "@prisma/client";

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
