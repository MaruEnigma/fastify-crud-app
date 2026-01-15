import { FastifyInstance } from "fastify"
import { createOrder } from "./controller";
import { OrderStatus } from "@prisma/client";

export const createOrderSchema = {
  tags: ['Orders'],
  params: {
    type: 'object',
    properties: {
      UserId: { type: 'string' },
    },
    required: ['UserId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        order: { type: 'object' },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};


//================================= Get order by id======================================================
//=======================================================================================================

export const getorderByIdSchema = {
  tags: ['Order'],
  summary: 'Get Order by id' ,
  body: {
    type: 'object',
    required: ['user_id' ] ,
    properties: {
      user_id: { type: 'string' }
    }
  },
  response: {
    200: {
      type:'object' ,
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

//========================================= UPDATE ORDER =============================
//====================================================================================

export const updateOrderSchema = {
  tags: ['Orders'],
  description: 'Update the status of an existing order',
  //==========params
  params: {
    type: 'object',
    properties: {
      OrderId: { type: 'string', description: 'Order ID to update' },
    },
    required: ['OrderId'],
  },
  //======= body
  body: {
    type: 'object',
    properties: {
      Status: { type: 'string', enum: ['unpaid', 'paid'], description: 'Order status' },
    },
    required: ['Status'],
  },

  //=========== reponse
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' },
      },
    },
  },
};

