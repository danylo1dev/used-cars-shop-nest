import { PickType } from "@nestjs/mapped-types";
import { IsBoolean } from "class-validator";
import { Report } from "../entities/report.entity";

export class ApproveReportDto extends PickType(Report, ["approved"]) {
  @IsBoolean()
  approved: boolean;
}
