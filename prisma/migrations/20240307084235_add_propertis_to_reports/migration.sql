/*
  Warnings:

  - Added the required column `lat` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mark` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report` ADD COLUMN `lat` INTEGER NOT NULL,
    ADD COLUMN `lon` INTEGER NOT NULL,
    ADD COLUMN `mark` VARCHAR(191) NOT NULL,
    ADD COLUMN `mileage` INTEGER NOT NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;
