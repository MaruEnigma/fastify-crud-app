-- DropForeignKey
ALTER TABLE "public"."OrderItems" DROP CONSTRAINT "OrderItems_OrderId_fkey";

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
