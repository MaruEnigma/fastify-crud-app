import { Param } from "@prisma/client/runtime/library";

//-------------------------------------------------CREATE WALLET------------------------------------------------------
export const createWalletSchema = {
  tags: ['Wallets'],
  body: {
    type: 'object',
    required: ['user_id', 'balance',  ],
    properties: {

      user_id: { type: 'string' } ,
      balance: { type: 'number' } ,
    
    }
  },

  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};


//----------------------------------------------------UPDATE WALLET---------------------------------------------------------------------
export const updateWalletSchema = {
  tags: ['Wallets'],
  body: {
    type: 'object',
    required: [ 'balance' ] ,

    properties: {   
      balance: { type: 'number'} ,
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

