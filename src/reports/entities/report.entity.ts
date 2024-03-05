import { Report as PrismaReport } from '@prisma/client';

export class Report implements PrismaReport {
  id: number;
  price: number;
}
