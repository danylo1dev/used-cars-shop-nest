import { OmitType } from '@nestjs/mapped-types';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Report } from '../entities/report.entity';

export class CreateReportDto extends OmitType(Report, ['id']) {
  @IsString()
  mark: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1880)
  @Max(3000)
  year: number;
  @IsLongitude()
  lon: number;
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Min(0)
  mileage: number;
  @IsNumber()
  @Min(0)
  price: number;
}
