import { FastifyRequest, FastifyReply } from "fastify";
import {db} from '../../../src/middleware/db' 
import { Product } from "@prisma/client";

export const addItem = async( req: FastifyRequest, reply: FastifyReply ) => {
    console.log('adding items to cart')
    try{
        const { Cartid } = req.params as { Cartid: string }
        const { ProductId, quantity: requestedQuantity } = req.body as {
      
        ProductId: string;
        quantity: number; 
        
        };
        // Check if product exist  
    const product = await db.product.findUnique( {
      where: { id: ProductId },
    } );

    if (!product) {
      return reply.status(404).send( { error: "product not found" } );
    }

    //  Check stock before adding
    if (product.quantity < requestedQuantity) {
      return reply.status(400).send({
        message: "Insufficient stock available",
      });
    }

    // Add items
    const cartItems = await db.cartItems.create( {

      data: {

        ProductId,
        quantity: requestedQuantity,
        Cartid
      },
    });

    
    //  Update product stock 
    await db.product.update({
      where: { id: ProductId },
      data: {
        quantity: product.quantity - requestedQuantity,
      },
    });

   return reply.status( 200 ).send ({
      message: "Product added to cart successfully" , 
      data: cartItems
    })

   
  } catch (error) {
    console.error(error);
    return reply.status(500).send ( { error: "Failed to add items" } );
  }
    
}   

//================================================UPDATE PRODUCT QUANTITY============================================
//===================================================================================================================
export const updateProductquantity = async ( req: FastifyRequest, reply: FastifyReply ) => {
  console.log("Updating product Quantity.....")
  try {
    const { Cartid } = req.params as { Cartid: string }
  
    const { ProductId, quantity: requestedQuantity } = req.body as {
      
        ProductId: string;
        quantity: number; 
        
        };

        // First check if item exists
    const cartItems = await db.cartItems.findUnique({
      where: {
        Cartid_ProductId: {
          Cartid,
          ProductId,
        },
      },
    });

    if (!cartItems) {
      return reply.status(404).send({ error: "Product not found in cart" });
    }

    const product = await db.product.findUnique( { where: { id: ProductId } } )
    if (!product){
      return reply.status(404).send ( { error: "Product not found in store " })
    }
    

     //  Check stock before adding more items to cart
    if ( requestedQuantity > product.quantity + cartItems.quantity ) {
      return reply.status(400).send({
        message: "Insufficient stock available",
      });
    }

    // New stock after request 

    const newStock = product.quantity + cartItems.quantity - requestedQuantity ;

    await db.product.update( { 
      where: { id: ProductId },
      data: { quantity: newStock },
    });

  //updating specific item in cart
    const updatequantity = await db.cartItems.update({
      where : { 
        Cartid_ProductId: 
          {
          Cartid,
          ProductId,
        }, 
      }, 
      data: { quantity: requestedQuantity }
    }) ;

    return reply.status( 200 ).send ({
      message: "Product Quantity updated successfully" , 
      data: updatequantity
    })

    }

  catch ( error ) {
    console.error( error ) ;
    return reply.status( 500 ).send( { error: "Failed to update Product Quantity" })
  }
}    
  

//========================================= DELETE ITEMS FROM CART ====================================================

export const DeleteItem = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Deleting product from cart...");
  try {
    const { Cartid } = req.params as { Cartid: string };
    const { ProductId } = req.body as { ProductId: string };

    // Check if the product exists in the cart
    const existingItem = await db.cartItems.findUnique({
      where: {
        Cartid_ProductId: {
          Cartid,
          ProductId,
        },
      },
    });

    if (!existingItem) {
      return reply.status(404).send({ error: "Product not found in cart" });
    }

    // Finding the product in store
    const product = await db.product.findUnique({
      where: { id: ProductId },
    });

    if (!product) {
      return reply.status(404).send({ error: "Product not found in store" });
    }

    //  Restore stock (add back the quantity that was in the cart)
    const updatedStock = product.quantity + existingItem.quantity;

    await db.product.update({
      where: { id: ProductId },
      data: { quantity: updatedStock },
    });

    //  Remove the product from the cart
    await db.cartItems.delete({
      where: {
        Cartid_ProductId: {
          Cartid,
          ProductId,
        },
      },
    });

    return reply.status(200).send({
      message: "Product deleted from cart successfully",
    });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Failed to delete product from cart" });
  }
};

//=================================== GET CART ITEMS BY CART ID ================================================

export const getCartItems = async( req: FastifyRequest, reply: FastifyReply ) => {
  console.log ( "Get cart items " )

  try{

    const { Cartid } = req.params as { Cartid: string };
    const { ProductId, quantity  } = req.body as {
      ProductId: string;
      quantity: number;
    };

    // Check if Cart exist  
    const cart = await db.cart.findUnique( {
      where: { id: Cartid },
    } );

    if (!cart) {
      return reply.status(404).send( { error: "cart not found" } );
    }

    const getItems = await db.cartItems.findMany({
      where: { id: Cartid }
    })
    
    



  }
  catch(error) {

  }
}