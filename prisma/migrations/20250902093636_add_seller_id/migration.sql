-- DropIndex
DROP INDEX "public"."CartItems_Cartid_key";

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItems" ADD CONSTRAINT "OrderItems_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
