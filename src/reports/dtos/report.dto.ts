import { Exclude, Expose } from 'class-transformer';
import { Report } from '../entities/report.entity';
export class ReportDto implements Report {
  constructor(partial?: Partial<ReportDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  mark: string;
  @Expose()
  model: string;
  @Expose()
  year: string;
  @Expose()
  lon: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;
  @Expose()
  id: number;
  @Expose()
  price: number;
}
