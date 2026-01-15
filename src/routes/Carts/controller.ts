import { FastifyRequest, FastifyReply } from "fastify";
import {db} from '../../../src/middleware/db'                  

//----------------------------------------------------------------------------------------------------------------
//-------------------------------------------------CREATE CARTS---------------------------------------------------
export const createCart = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
   
    const { PurchaserId } = req.body as {
      PurchaserId: string
    };
 
    const existingCart = await db.cart.findUnique( { 
      where: { PurchaserId }
    });

    if (existingCart) {
      return reply.status(400).send({ message: "Cart already exists for this user" });
    }
    // Create product
    const cart = await db.cart.create({
      data: {
        PurchaserId,
        
    },
    } ) ;

    return reply.status(201).send ( {
      message: `Cart created successfully`,
      data: cart,
    } ) ;

  } 
    catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to create cart" });
  }
};

//===================================================================================================================
//=============================================Get Purchaser Cart by ID =============================================

export const getCartByUserId = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Fetching cart by user ID...");
  try {
    const { PurchaserId } = req.params as { PurchaserId: string };

    // Fetch the cart using PurchaserId (unique field)
    const cart = await db.cart.findUnique({
      where: { PurchaserId },
      include: {
        CartItems: {
          include: {
            product: true, // to show product details
          },
        },
      },
    });

    if (!cart) {
      return reply.status(404).send({ error: "Cart not found" });
    }

    return reply.status(200).send({
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch cart" });
  }
};


//===================================Cart Items=======================================================
export const addItem = async( req: FastifyRequest, reply: FastifyReply ) => {
    console.log('adding items to cart')
    try{
        const { Cartid } = req.params as { Cartid: string }
        const { ProductId, quantity } = req.body as {
      
        ProductId: string;
        quantity: number; 
        
        };
        // Check if cart exists    
    const cart = await db.cart.findUnique( {
      where: { id: Cartid },
    } );

    if (!cart) {
      return reply.status(404).send( { error: "Cart not found" } );
    }

    // Add items
    const cartItems = await db.cartItems.create( {

      data: {

        ProductId,
        quantity,
        Cartid
      },
    });
      return reply.status(201).send({
      message: "Product created successfully",
      data: cartItems,
    } );
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
  
    const { ProductId, quantity } = req.body as {
      
        ProductId: string;
        quantity: number; 
        
        };

        // First check if item exists
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

//updating specific item in cart
    const cartItems = await db.cartItems.update({
      where : { 
        Cartid_ProductId: 
          {
          Cartid,
          ProductId,
        }, 
      }, 
      data: { quantity }
    }) ;

    return reply.status( 200 ).send ({
      message: "Product Quantity updated successfully" , 
      data: cartItems
    })

    }

  catch ( error ) {
    console.error( error ) ;
    return reply.status( 500 ).send( { error: "Failed to update Product Quantity" })
  }
}

//======================================Delete products==================================================
//======================================================================================================
export const DeleteteItem = async ( req: FastifyRequest, reply: FastifyReply ) => {
  console.log("Deleting product Quantity.....")
  try {
    const { Cartid } = req.params as { Cartid: string }
  
    const { ProductId } = req.body as {
      
        ProductId: string;
        
        }

        // First check if item exists
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


    const deleteItems = await db.cartItems.delete({
      where : { 
        Cartid_ProductId: 
          {
          Cartid,
          ProductId,
        }, 
      }, 
      
    }) ;

    return reply.status( 200 ).send ({
      message: "Product Deleted Successfully" , 
      data: deleteItems ,
    })

    }

  catch ( error ) {
    console.error( error ) ;
    return reply.status( 500 ).send( { error: "Failed to delete Product Quantity" })
  }
}

//================================= GET ALL CARTS ==========================================================

export const GetAllCarts = async ( req: FastifyRequest, reply: FastifyReply ) => {
  try{
    const cart = await db.cart.findMany( { } );
    return reply.status(200).send({
      message: "All carts list fetched successfully",
      data: cart
    } );
  }
  catch (error) {
    console.error(error);
    return reply.status( 500 ).send ( { error: "Failed to fetch carts list" } );
  }
}
