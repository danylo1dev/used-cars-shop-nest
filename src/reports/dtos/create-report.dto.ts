import { OmitType } from "@nestjs/mapped-types";
import { ReportDto } from "./report.dto";

export class CreateReportDto extends OmitType(ReportDto, ["id", "userId", "approved"]) {}
