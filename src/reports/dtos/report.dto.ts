import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { Report } from "../entities/report.entity";
enum transforToType {
  "string" = "string",
  "boolean" = "boolean",
  "number" = "number",
}
function transform<T>(type: transforToType) {
  const transformer = {
    string: (value): T => {
      return `${value}` as T;
    },
    boolean: (value): T => {
      return Boolean(transformer.number(value)) as T;
    },
    number: (value): T => {
      return +value as T;
    },
  };
  return ({ value }): T => {
    if (value) {
      return transformer[type](value);
    }
    return;
  };
}
export class ReportDto implements Report {
  constructor(partial?: Partial<ReportDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: number;

  @Expose()
  @IsBoolean()
  @Transform(transform<boolean>(transforToType.boolean))
  approved: boolean;

  @Expose()
  @IsNumber()
  userId: number;

  @Expose()
  @IsString()
  mark: string;

  @Expose()
  @IsString()
  model: string;

  @Expose()
  @IsNumber()
  @Min(1880)
  @Max(3000)
  @Transform(transform<number>(transforToType.number))
  year: number;

  @Expose()
  @IsLongitude()
  @Transform(transform<number>(transforToType.number))
  lon: number;

  @Expose()
  @IsLatitude()
  @Transform(transform<number>(transforToType.number))
  lat: number;

  @Expose()
  @Min(0)
  @Transform(transform<number>(transforToType.number))
  mileage: number;

  @Expose()
  @Min(0)
  @Transform(transform<number>(transforToType.number))
  price: number;
}
