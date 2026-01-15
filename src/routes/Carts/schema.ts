//----------------------------------------------------------------------------------------------------------------------------//
//===========================================CREATE CART========================================================


export const createCartSchema = {
  tags: ['Carts'],
  summary: "Creating Cart",

  body: {
    type: 'object',
    required: ['PurchaserId'  ],
    properties: {

      PurchaserId: { type: 'string' } ,
     
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

//==========================================Get Cart==============================================================
//================================================================================================================
export const getCartByUserIdSchema = {
  tags: ["Carts"],
  summary: "Get cart by user (Purchaser) ID along with cart items.",
  params: {
    type: "object",
    properties: {
      PurchaserId: { type: "string" },
    },
    required: ["PurchaserId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
            PurchaserId: { type: "string" },
            CreatedAt: { type: "string" },
            CartItems: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  quantity: { type: "integer" },
                  product: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      price: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};


//=========================================Adding items to Cart================================

export const addItemsSchema = {
        tags: ["CartItems"],
        summary: "Add item to cart",
        params: {
          type: "object",
          properties: {
            Cartid: { type: "string" },
          },
          required: ["Cartid"],
        },
        body: {
          type: "object",
          properties: {
            ProductId: { type: "string" },
            quantity: { type: "integer", minimum: 1 },
          },
          required: ["ProductId", "quantity"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  ProductId: { type: "string" },
                  quantity: { type: "integer" },
                  Cartid: { type: "string" },
                  UpdatedAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
      }
  
//============================================Update product quantity=================================
//===================================================================================================

export const updateProductQuantitySchema = {
  tags: ['CartItems'],
  summary: 'Updating product quantity.',
  body: {
    type: 'object',
    properties: {
      quantity: { type: 'number' },
      ProductId: { type: 'string' }
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

//============================================Delete items==================================================
//==========================================================================================================
export const DeleteProductSchema = {
  tags: ['CartItems'],
  summary: 'Deleting items from cart using Cartid',
  body: {
    type: 'object',
    properties: {
      //quantity: { type: 'number' },
      ProductId: { type: 'string' },
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
