import { Report as PrismaReport } from "@prisma/client";

export class Report implements PrismaReport {
  approved: boolean;
  userId: number;
  mark: string;
  model: string;
  year: number;
  lon: number;
  lat: number;
  mileage: number;
  id: number;
  price: number;
}
