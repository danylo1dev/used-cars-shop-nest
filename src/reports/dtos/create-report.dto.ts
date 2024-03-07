import { Report as PrismaReport } from '@prisma/client';
import { OmitType } from '@nestjs/mapped-types';
import { Report } from '../entities/report.entity';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto extends OmitType(Report, ['id']) {
  @IsString()
  mark: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1880)
  @Max(3000)
  @Length(4)
  year: string;
  @IsLongitude()
  lon: number;
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Min(0)
  mileage: number;
  price: number;
}
