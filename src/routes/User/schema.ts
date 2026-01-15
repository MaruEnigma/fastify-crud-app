// import { updateUser } from "./controller";

//--------------------------------------------------------Schema file------------------------------------------------------------------------
export const createUserSchema = {
  tags: ['User'],
  summary: 'Create user',
  body: {
    type: 'object',
    required: ['name', 'email', 'phoneNumber', 'role' ],
    properties: {
      name: { type: 'string' } ,
      email: { type: 'string', format: 'email' } ,
      phoneNumber: { type: 'string'} ,
      role: { type: "string", enum: ["purchaser", "seller"] },
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


// -------------------------------------------- Deleting All users --------------------------------------------------
export const deleteUsersSchema = {
  tags: ['User'],
  summary: 'Delete all users',
  description: 'Delete all users with optional pagination and search query',
  querystring: {
    type: 'object',
    properties: {
      // limit:  { type: 'integer', minimum: 1, example: 10 },
      // offset: { type: 'integer', minimum: 0, example: 0 },
      // search: { type: 'string', example: 'John' }
    }
  },
  response: {
    200: {
      description: 'Users deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Users deleted successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              //id: { type: 'string', example:  },               //new update
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' }
            }
          }
        }
      }
    }
  }
};


//----------------------------------------------------UPDATE USER---------------------------------------------------------------------
export const updateUserSchema = {
  tags: ['User'],
  summary: 'Update user by id',
  body: {
    type: 'object',
    // required: ['id'],            //new line update 
    properties: {
      // id: { type: "string", format: "uuid" } ,        // new line update
      name: { type: 'string' } ,
      email: { type: 'string', format: 'email' } ,
      phoneNumber: { type: 'string'} ,
      role: { type: "string", enum: ["purchaser", "seller"] },

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


//------------------------------------------------------Get all users--------------------------------------------------

export const getUsersSchema = {
  tags: ['User'],
  summary: 'Get all users with pagination',
  description: 'Fetch users with optional paginatiom',
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'integer', minimum: 1, default: 10, description: 'Number of users to fetch' },
      page: { type: 'integer', minimum: 0, default: 0, description: 'Number of users to skip' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phoneNumber: { type: 'string' },
              role: { type: "string", enum: ["purchaser", "seller"] },

            }
          }
        }
      }
    }
  }
};

//=====================================GEt User By ID =============================================

export const getUserByIdSchema = {
  tags: ['User'],
  summary: 'Get user by ID',
  params: {               // params for path variables
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phoneNumber: { type: 'string' },
            role: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};

