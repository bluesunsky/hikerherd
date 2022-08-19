/*
  Warnings:

  - Made the column `replaceable` on table `Gear` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Gear" ADD COLUMN     "manufacturer" TEXT,
ALTER COLUMN "replaceable" SET NOT NULL;
