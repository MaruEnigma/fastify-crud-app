/*
  Warnings:

  - A unique constraint covering the columns `[Cartid,ProductId]` on the table `CartItems` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."CartItems_ProductId_key";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_Cartid_ProductId_key" ON "public"."CartItems"("Cartid", "ProductId");
