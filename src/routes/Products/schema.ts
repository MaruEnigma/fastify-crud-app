import { platform } from "os";
import { title } from "process";

//-------------------------------------------------CREATE PRODUCT------------------------------------------------------
export const createProductSchema = {
  tags: ['Products'],
  body: {
    type: 'object',
    required: [ 'title', 'price'  ],

    properties: {
      title: { type: 'string' } ,
      price: { type: 'number' } ,
      //sellerId: { type: 'string' },
      description: { type: 'string' },
      quantity: { type: 'number' }
    
    
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

//--------------------------------------Getting All products----------------------------------------------------------

export const getProductsSchema = {
  tags: ['Products'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          
          title: { type: 'string' },
          price: { type: 'number' },
          
          }
        }
    }
  } 
}

//------------------------------------------------------Update products---------------------------------------------------

// export const updateProductSchema = {
//   tags: ['Products'],
//   body: {
//     type: 'object',
//     properties: {
//       title: { type: 'string' } ,
//       price: { type: 'number'} ,
//       description: { type: 'string' } ,
//       quantity: { type: 'number' }
//     }
//   },
//   response: {
//     200: {
//       type: 'object',
//       properties: {
//         message: { type: 'string' }
//       }
      
//     }
//   }
// };

export const updateProductSchema = {
  tags: ['Products'],

  params: {
    type: 'object',
    properties: {
      sellerId: { type: 'string' },
      id: { type: 'string' },
    },
    required: ['sellerId', 'id'],
  },

  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
      quantity: { type: 'number' },
    },
  },

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

