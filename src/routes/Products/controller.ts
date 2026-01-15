//import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRequest, FastifyReply } from "fastify";

import {db} from '../../../src/middleware/db'                  

//----------------------------------------------Create Products---------------------------------------------------------

export const createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sellerId } = req.params as { sellerId: string }
    const { title, description, price, quantity } = req.body as {
      // sellerId: string;
      title: string;
      description?: string;
      price: number;
      quantity: number
    };

    // Check if user exists and is a seller
    const user = await db.user.findUnique({
      where: { id: sellerId },
    });

    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    if (user.role !== "seller") {
      return reply.status(403).send( { error: "Only sellers can add products" });
    }

    // Create product
    const product = await db.product.create({
      data: {
        title,
        description,
        price,
        sellerId,
        quantity
      },
    });

    return reply.status(201).send({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to create product" });
  }
};



//---------------------------------------------------Get All Products of single seller -----------------------------------------------------

export const getAllProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Get function started");

  try {
    const { sellerId } = req.params as { sellerId: string };

    // Step 1: Check if user exists
    const user = await db.user.findUnique({
      where: { id: sellerId },
    });

    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    // Step 2: Ensure only sellers can fetch their products
    if (user.role !== "seller") {
      return reply.status(403).send({ error: "Only sellers can get products" });
    }

    // Step 3: Fetch products that belong to this seller
    const products = await db.product.findMany({
      where: { sellerId }, // filter products by sellerId
    });

    if (products.length === 0) {
      return reply.status(200).send({
        message: `No products found for seller with ID: ${sellerId}`,
        data: [],
      });
    }

    return reply.status(200).send({
      message: `Products of seller ID: ${sellerId} fetched successfully`,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch products" });
  }
};


//--------------------------------------------------GET PRODUCTS OF ALL SELLERS ------------------------------------------------

export const get_All_Sellers_Product = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log ( "Getting Products of all Sellers " )

    try {
      
    // const { limit = 10, offset = 0, search } = req.query as {
    //   limit?: number;
    //   offset?: number;
    //   search?: string;
    // };
      

    const product = await db.product.findMany ( {
      // skip: offset,
      // take: limit,
      // where: search ? { title: { contains: search } } : undefined
      } );

    return reply.status(200).send({
      message: "All sellers Products fetched successfully",
      data: product
    });
  } 
    catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch products" });
  }
}

//--------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------Delete All products---------------------------------------------

export const deleteAllProducts = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log("Deleting All products function is running")
    try {
        
        const product = await db.product.deleteMany();
        return reply.status(200).send({
        message: "All Products deleted successfully",
        data: product
    });

    }

    catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Failed to delete Products"})
    }
} ;

//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------Delete Product by ID------------------------------------------------
export const deleteProductbyID = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log("Delete_Product_by_ID function is running")
try{
    const { id } = req.params as { id: string };
    const product = await db.product.delete({
      where: { id }
    });

    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }

    return reply.status(200).send({
      message: "Product deleted successfully" ,
      data: product
    });

  }
  catch (error){
    console.error(error);
    return reply.status(500).send({ error: "Failed to delete product"}) ;
  }
};

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------Update Product-----------------------------------------------------

// export const updateProduct = async ( req: FastifyRequest, reply: FastifyReply ) => {
//   console.log("Update product function is running")
//   try {
//     const { id } = req.params as { id: string }
  
//     const { title, price, description, quantity } = req.body as {
//     title? : string ,
//     price? : number ,
//     description? : string ,
//     quantity? : number
//   }

//   const product = await db.product.update({
//       where : { id }, 
//       data: { title, price, description, quantity }
//     }) ;

//     return reply.status( 200 ).send ({
//       message: "Product updated successfully" , 
//       data: product
//     })

//     }

//   catch ( error ) {
//     console.error( error ) ;
//     return reply.status( 500 ).send( { error: "Failed to update Product" })
//   }
// }

export const updateProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Update product function is running");

  try {
    const { sellerId, id } = req.params as { sellerId: string; id: string };

    const { title, price, description, quantity } = req.body as {
      title?: string;
      price?: number;
      description?: string;
      quantity?: number;
    };

    // Check if product exists and belongs to this seller
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return reply.status(404).send({ message: "Product not found" });
    }

    if (product.sellerId !== sellerId) {
      return reply.status(403).send({ message: "You are not authorized to update this product" });
    }

    // Update product
    const updatedProduct = await db.product.update({
      where: { id },
      data: { title, price, description, quantity },
    });

    return reply.status(200).send({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to update product" });
  }
};
