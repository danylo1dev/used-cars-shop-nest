import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ResponseToSerializable } from "src/decorators/ResponseToSerializable";
import { SessionAuthGuard } from "src/guards/session-auth.guard";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportDto } from "./dtos/report.dto";
import { ReportsService } from "./reports.service";
import { AdminGuard } from "src/guards/admin.guard";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
import { EstimateDto } from "./dtos/estimate.dto";

@Controller("reports")
@SerializeOptions({ strategy: "excludeAll" })
@UseInterceptors(ClassSerializerInterceptor)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Post()
  @UseGuards(SessionAuthGuard)
  @ResponseToSerializable<ReportDto>(ReportDto)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User): Promise<ReportDto> {
    return await this.reportsService.create(body, user);
  }
  @Patch("/:id/approve")
  @UseGuards(AdminGuard)
  @ResponseToSerializable<ReportDto>(ReportDto)
  async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto): Promise<ReportDto> {
    return this.reportsService.changeApproval(+id, body.approved);
  }
  @Get()
  @ResponseToSerializable<EstimateDto>(EstimateDto)
  async getEstimate(@Query() query: GetEstimateDto) {
    return await this.reportsService.createEstimate(query);
  }
}
