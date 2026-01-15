/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_UserId_key" ON "Order"("UserId");
