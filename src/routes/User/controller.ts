import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import {db} from '../../../src/middleware/db'                  
import { userInfo } from 'os';
import { UserRole } from '@prisma/client';

//------------------------------------------------Create User--------------------------------------------------------------

export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log ("create function started")
  try {
    const { name, email, phoneNumber,role } = req.body as { name: string; email: string; phoneNumber: string; role: UserRole };
    console.log("create function started", name, email, phoneNumber, role )

//-----------------Check if user with this email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ error: "Email already exists" });
    }

    const user = await db.user.create({
      data: { name, email, phoneNumber, role }
      
    });

     console.log("create function started", user)

    return reply.status(201).send({
      message: "User created successfully in User controller",
      data: user,
    });
     
  } catch (error) {
    console.error(error);
    return reply.status(500).send( { error: "Failed to create user" } );
  }
};

 
//-------------------------------------------------------Get all users-------------------------------------------------------------------
export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Getting all users")
  try {
    // const { id } = req.params as { id: string };
    const { limit = 10, page = 0 } = req.query as {
      limit?: number;
      page?: number;
    };
    const users = await db.user.findMany({
      skip: Number(page),
      take: Number(limit),
    });

    return reply.status(200).send({
      message: "Users fetched successfully",
      data: users
    });
  } 

    catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Failed to fetch users" });
  }
};


//------------------------------------------------------Get single user by ID---------------------------------------------------------------

export const getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Getting single user by ID")
  try {
    const { id } = req.params as { id: string };
    const user = await db.user.findUnique({
    where: { id }             
    });

    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    return reply.status(200).send({
      message: "User fetched successfully",
      data: user
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Failed to fetch user" });
  }
};

//-----------------------------------------------------delete a user by ID------------------------------------------------ 
export const deleteUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("Delete a User by ID")
  try{
    const { id } = req.params as { id: string };
    const user = await db.user.delete({
    where: { id }                           
    });
    
    return reply.status(200).send({
      message: "User deleted successfully" ,
      data: user
    });

    // if (!user) {
    //   return reply.status(404).send({ error: "User not found" });
    // }

  }
  catch (error){
    console.error(error);
    return reply.status(500).send({ error: "Failed to delete user"}) ;
  }
};

//--------------------------------------------------delete All users-----------------------------------------------------
export const deleteAllUsers = async(req: FastifyRequest, reply: FastifyReply) => {
  console.log("Delete All users")
  try {

    const users = await db.user.deleteMany();
  
    return reply.status(200).send({
      message: "All users deleted successfully",
      data: users
    });
  }
  catch (error) {
  console.error(error);
  return reply.status(500).send({ error: "Failed to delete users" });
  }
};


//--------------------------------------------------UPDATE USER by ID -----------------------------------------------------------------------

export const updateUser = async( req: FastifyRequest, reply: FastifyReply) => {
  console.log(" Update function running" )
  try{
    const { id } = req.params as { id: string };
    
    const { name, email, phoneNumber, role } = req.body as {
      name? : string ,
      email? : string ,
      phoneNumber? : string , 
      role? : UserRole  
    }

    const user = await db.user.update({
      
      where: { id } ,                                       
      data: { name, email, phoneNumber, role }
    }) ;

    return reply.status( 200 ).send( {
      message : " User Updated successfully " ,
      data : user
    }) ;

  }

  catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

