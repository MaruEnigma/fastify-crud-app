import { FastifyInstance } from 'fastify';
import { createUserSchema, } from './schema';
import { createUser } from './controller';
import { getUsers } from './controller';
import { getUserById } from './controller';
import { deleteUserById } from './controller';          //.....delete import
import { deleteAllUsers } from './controller';
import { updateUser } from './controller';
import { updateUserSchema } from './schema';
import { getUsersSchema } from './schema';
import { deleteUsersSchema } from './schema';
import { getUserByIdSchema } from './schema';



export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', { schema: createUserSchema }, createUser);
  fastify.get("/users", { schema: getUsersSchema }, getUsers )
  fastify.get("/users/:id", { schema: getUserByIdSchema }, getUserById) ;
  fastify.delete("/users/:id", { schema: { tags: ['User'] } }, deleteUserById) ;          //.... 
  fastify.delete("/users", { schema: deleteUsersSchema }, deleteAllUsers) ;
  fastify.put("/users/:id", { schema: updateUserSchema}, updateUser ) ;

}