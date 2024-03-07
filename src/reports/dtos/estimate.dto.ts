import { Expose } from "class-transformer";

export class EstimateDto {
  constructor(values: Partial<EstimateDto>) {
    Object.assign(this, values);
  }
  @Expose()
  price: number;
}
