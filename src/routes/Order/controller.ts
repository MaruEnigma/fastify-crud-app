import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../../src/middleware/db";
import { OrderStatus, Prisma } from "@prisma/client";


export const createOrder = async (req: FastifyRequest, reply: FastifyReply) => {  
  console.log("Received request body:", req.body);

  try {
    const { UserId } = req.params as { UserId: string };           
    console.log("Extracted UserID:", UserId);

    // Fetch purchaser's wallet
    const purchaserWallet = await db.wallet.findUnique({
      where: { user_id: UserId },
    });

    if (!purchaserWallet) {
      return reply.status(400).send({ message: "Purchaser wallet not found" });
    }

    //  Get user cart with items + products
    const cart = await db.cart.findUnique({
      where: { PurchaserId: UserId },
      include: {
        CartItems: {
          include: { product: { include: { user: true } } }, // seller info
        },
      },
    });

    if (!cart || cart.CartItems.length === 0) {
      return reply.status(400).send({ message: "Cart is empty" });
    }


    // 2. Calculate total amount, platform fee, and seller amount
    let TotalAmount = new Prisma.Decimal(0);

    cart.CartItems.forEach((item) => {
      TotalAmount = TotalAmount.add(item.product.price.mul(item.quantity));
    });

    const PlatformFee = TotalAmount.mul(0.2); // 20%
    const SellerAmount = TotalAmount.mul(0.8); // 80%

     // Check if purchaser has enough balance
    if (purchaserWallet.balance.lt(TotalAmount)) {
      return reply.status(400).send({
        message: "Insufficient balance in wallet",
        currentBalance: purchaserWallet.balance,
        required: TotalAmount,
      });
    }

    // 3. Create order with order items
    const order = await db.order.create({
      data: {
        UserId,
        TotalAmount,
        PlatformFee,
        SellerAmount,
        Status: "unpaid",
        OrderItems: {
          create: cart.CartItems.map((item) => ({
            quantity: item.quantity,
            Price: item.product.price,
            product: { connect: { id: item.ProductId } },
          })),
        },
      },
      include: { OrderItems: true },
    });

    
    //  Deduct purchaser wallet balance
    await db.wallet.update({
      where: { user_id: UserId },
      data: {
        balance: { decrement: TotalAmount },
      },
    });

       // Pay sellers (80%) and update platform wallet (20%)
    for (const item of cart.CartItems) {
      const sellerId = item.product.sellerId;
      const sellerShare = item.product.price.mul(item.quantity).mul(0.8);

      await db.wallet.upsert({
        where: { user_id: sellerId },
        update: { balance: { increment: sellerShare } },
        create: { user_id: sellerId, balance: sellerShare },
      });
    }

    await db.wallet.upsert({
      where: { user_id: "platform" },
      update: { balance: { increment: PlatformFee } },
      create: { user_id: "platform", balance: PlatformFee },
    });

    // Empty cartitems after successful payment
    await db.cart.delete( { where: { id: cart.id }});
    // Also delete cart 
    await db.cartItems.deleteMany({ where: { Cartid: cart.id } });


    // Update order status >>> paid
    const paidOrder = await db.order.update({
      where: { id: order.id },
      data: { Status: "paid" },
    });

    
    return reply.status(201).send({
      message: "Order created and payment completed successfully",
      order: paidOrder,
    });

  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Something went wrong", error });
  }
};

//========================================= Getting all orders list ==============================================
//================================================================================================================

export const GetAllOrders = async ( req: FastifyRequest, reply: FastifyReply ) => {
  try{
    const order = await db.order.findMany( { } );
    return reply.status(200).send({
      message: "All orders list fetched successfully",
      data: order
    } );
  }
  catch (error) {
    console.error(error);
    return reply.status( 500 ).send ( { error: "Failed to fetch orders list" } );
  }
}

//=======================================GET ORDER BY ID ====================================================
//==========================================================================================================

export const getOrdertbyId = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log("getting order by id");
    try {
    const { id } = req.params as { id: string };
    const order = await db.order.findUnique({
    where: { id }             
    });

    if (!order) {
      return reply.status(404).send({ error: "Wallet not found" });
    }

    return reply.status(200).send({
      message: "Order fetched successfully",
      data: order
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch order" });
  }
}

//========================================= UPDATE ORDER STATUS ====================================================
//===========================================================================================================

// export const updateOrderStatus = async( req: FastifyRequest, reply: FastifyReply) => {
//   console.log(" Update function running" )
//   try{
//     const { OrderId } = req.params as { OrderId: string };
    
//     const { Status } = req.body as {
      
//       Status? : OrderStatus 
//     }

//     const order = await db.order.update({
      
//       where: { id: OrderId } ,                                       
//       data: { Status }
//     }) ;

//     return reply.status( 200 ).send( {
//       message : " Order Status Updated successfully " ,
//       data : order
//     }) ;

//   }

//   catch (error) {
//     console.error(error);
//     return reply.status(500).send({ error: "Internal server error" });
//   }
// }

//======================================Delete Order ==================================================
//======================================================================================================
export const deleteOrder = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log( " Deleting Order" )
try{
    const { OrderId } = req.params as { OrderId: string };

    const order = await db.order.delete({  where: { id: OrderId } });

    if (!order) {
      return reply.status(404).send({ error: "Order not found" });
    }

    return reply.status(200).send({
      message: "Order deleted successfully" ,
      data: order
    });

  }
  catch (error){
    console.error(error);
    return reply.status(500).send({ error: " Something went wrong "}) ;
  }
};



