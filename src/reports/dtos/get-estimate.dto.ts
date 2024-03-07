import { OmitType } from "@nestjs/mapped-types";
import { ReportDto } from "./report.dto";

export class GetEstimateDto extends OmitType(ReportDto, ["price", "approved", "userId"] as const) {}
