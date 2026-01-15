import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import {db} from '../../../src/middleware/db'        
import { Decimal } from "@prisma/client/runtime/library";
import { userInfo } from 'os';
import { UserRole } from '@prisma/client';

//-----------------------------------------------Create Wallets------------------------------------------------------
export const createWallet = async ( req: FastifyRequest, reply: FastifyReply ) => {
  try {
    // sconst { id } = req.params as { id: string };
    const { user_id, balance } = req.body as {
      user_id: string ,
      balance: number
    } ;
    console.log( `Create Wallet function started`, user_id , balance  )

      // Check if the wallet already exists for this user
    const existingWallet = await db.wallet.findUnique({
      where: { user_id },
    });

    if (existingWallet) {
      return reply.status(400).send({ message: "Wallet already exists for this user" });
    }

    const wallet = await db.wallet.create ( {
        data: { balance,
            user: { connect: { id: user_id } }
         
        } } );
    
    return reply.status(201).send({
        message: "Wallet created successfully in Wallet controller",
        data: wallet,
        });
    }

  catch (error) {
     
    console.error(error);
    return reply.status(500).send( { error: "Failed to create wallet" } );
  }
}

//-------------------------------------------GET WALLET BY User_ID-------------------------------------------------

export const getWalletbyId = async ( req: FastifyRequest, reply: FastifyReply ) => {
    console.log("get wallet by id function is running");
    try {
    const { user_id } = req.params as { user_id: string };
    const wallet = await db.wallet.findUnique({
    where: { user_id }             
    });

    if (!wallet) {
      return reply.status(404).send({ error: "Wallet not found" });
    }

    return reply.status(200).send({
      message: "Wallet fetched successfully",
      data: wallet
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch wallet" });
  }
}

//===========================================Get All Wallets===================================================
//==========================================----------------===================================================

export const GetAllWallets = async ( req: FastifyRequest, reply: FastifyReply ) => {
  try{
    const wallet = await db.wallet.findMany( { } );
    return reply.status(200).send({
      message: "All wallets fetched successfully",
      data: wallet
    } );
  }
  catch (error) {
    console.error(error);
    return reply.status( 500 ).send ( { error: "Failed to fetch products" } );
  }
}

//-----------------------------------------UPDATE WALLET BY ID-------------------------------------------------

// export const updateWallet = async ( req: FastifyRequest, reply: FastifyReply ) => {
//   console.log("Update wallet function is running")
//   try {
//     const { user_id } = req.params as { user_id: string }
  
//     const { balance } = req.body as {
//     balance?: number,
    
//   }

//   const wallet = await db.wallet.update({
//       where : { user_id }, 
//       data: { balance }
//     }) ;

//     return reply.status( 200 ).send ({
//       message: "Wallet updated successfully" , 
//       data: wallet
//     })

//     }

//   catch ( error ) {
//     console.error( error ) ;
//     return reply.status( 500 ).send( { error: "Failed to update wallet" })
//   }
// }


export const updateWallet = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Update wallet function is running");
  try {
    const { user_id } = req.params as { user_id: string };

    const { balance } = req.body as { balance?: number };

    if (!balance || balance <= 0) {
      return reply.status(400).send({ error: "Invalid balance amount" });
    }

    // Step 1: Get the existing wallet
    const existingWallet = await db.wallet.findUnique({
      where: { user_id },
    });

    if (!existingWallet) {
      return reply.status(404).send({ error: "Wallet not found" });
    }

    // Step 2: Add new balance to existing balance safely (Decimal addition)
    const updatedWallet = await db.wallet.update({
      where: { user_id },
      data: {
        balance: new Decimal(existingWallet.balance).add(new Decimal(balance)),
      },
    });

    return reply.status(200).send({
      message: "Wallet updated successfully",
      data: updatedWallet,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to update wallet" });
  }
};


//====================================DELETE WALLET BY ID ============================================
export const deleteWalletbyId = async ( req: FastifyRequest, reply: FastifyReply ) => {
  console.log(" Delete Wallet by Id ")
  try{
    const{ id } = req.params as { id: string }
    const wallet = await db.wallet.delete ( { where: { id } } );

    if (!wallet) {
      return reply.status(404).send({ error: "Wallet not found" });
    }

    return reply.status(200).send({
      message: "Wallet deleted successfully" ,
      data: wallet
    });
  }

  catch (error) {
    console.error(error);
    return reply.status(500).send({ error: " Wallet cannot deleted "}) ;

  }
}; 

//====================================DELETE ALL WALLETS =============================================

export const deleteAllWallets = async ( req: FastifyRequest, reply: FastifyReply ) => {
  console.log(" Delete All Wallets ")
  try{
    const{ id } = req.params as { id: string }
    const wallet = await db.wallet.deleteMany ( { where: { id } } );

    return reply.status(200).send({
      message: "All Wallets deleted successfully" ,
      data: wallet
    });
  }

  catch (error) {
    console.error(error);
    return reply.status(500).send({ error: " Wallets cannot deleted "}) ;

  }
}; 
