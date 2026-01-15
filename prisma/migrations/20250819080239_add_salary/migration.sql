/*
  Warnings:

  - You are about to drop the column `Salary` on the `User` table. All the data in the column will be lost.
  - Added the required column `salary` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "Salary",
ADD COLUMN     "salary" INTEGER NOT NULL;
