-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'FR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL DEFAULT E'EN';
