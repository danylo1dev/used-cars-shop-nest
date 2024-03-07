import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ResponseToSerializable } from "src/decorators/ResponseToSerializable";
import { SessionAuthGuard } from "src/guards/session-auth.guard";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { ReportsService } from "./reports.service";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CurrentSessionUserInterceptor } from "src/users/interceptors/current-user.interceptor";
import { ApproveReportDto } from "./dtos/approve-report.dto";

@Controller("reports")
@SerializeOptions({ strategy: "excludeAll" })
@ResponseToSerializable<ReportDto>(ReportDto)
@UseInterceptors(CurrentSessionUserInterceptor, ClassSerializerInterceptor)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Post()
  @UseGuards(SessionAuthGuard)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User): Promise<ReportDto> {
    return await this.reportsService.create(body, user);
  }
  @Patch("/:id/approve")
  async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto): Promise<ReportDto> {
    return this.reportsService.changeApproval(+id, body.approved);
  }
}
