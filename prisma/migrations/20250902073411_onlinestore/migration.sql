-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('seller', 'purchaser');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('paid', 'unpaid');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "PlatformFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'purchaser';

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" TEXT NOT NULL,
    "PurchaserId" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItems" (
    "id" TEXT NOT NULL,
    "Cartid" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "TotalAmount" DECIMAL(10,2) NOT NULL,
    "PlatformFee" DECIMAL(10,2) NOT NULL,
    "SellerAmount" DECIMAL(10,2) NOT NULL,
    "Status" "public"."OrderStatus" NOT NULL DEFAULT 'unpaid',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItems" (
    "id" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "Price" DECIMAL(10,2) NOT NULL,
    "OrderId" TEXT NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "public"."Wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_PurchaserId_key" ON "public"."Cart"("PurchaserId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_Cartid_key" ON "public"."CartItems"("Cartid");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_ProductId_key" ON "public"."CartItems"("ProductId");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_PurchaserId_fkey" FOREIGN KEY ("PurchaserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItems" ADD CONSTRAINT "CartItems_Cartid_fkey" FOREIGN KEY ("Cartid") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItems" ADD CONSTRAINT "CartItems_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItems" ADD CONSTRAINT "OrderItems_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
