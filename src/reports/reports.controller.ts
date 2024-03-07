import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ResponseToSerializable } from "src/decorators/ResponseToSerializable";
import { SessionAuthGuard } from "src/guards/session-auth.guard";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { ReportsService } from "./reports.service";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CurrentSessionUserInterceptor } from "src/users/interceptors/current-user.interceptor";

@Controller("reports")
@ResponseToSerializable<ReportDto>(ReportDto)
@UseInterceptors(CurrentSessionUserInterceptor, ClassSerializerInterceptor)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Post()
  @UseGuards(SessionAuthGuard)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User): Promise<ReportDto> {
    console.log(user);
    return await this.reportsService.create(body, user);
  }
}
