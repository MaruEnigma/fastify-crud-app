import type { FastifyInstance } from 'fastify'; 
import { createOrder } from './controller';
import { GetAllOrders } from './controller';
import { getOrdertbyId } from './controller';
//import { updateOrderStatus } from './controller';
import { createOrderSchema } from './schema';
import { deleteOrder } from './controller';




export default async function orderRoutes( fastify: FastifyInstance ) {
    fastify.post('/Order/:UserId', { schema: createOrderSchema }, createOrder ) ;
    fastify.get('/Order', { schema: { tags: ['Orders'] } }, GetAllOrders ) ;
    fastify.get('/Order/:id', { schema: { tags: ['Orders'] } }, getOrdertbyId ) ;
    //fastify.put('/Order/:OrderId', { schema: updateOrderSchema, handler: updateOrderStatus, } ) ;
    fastify.delete('/Order/:OrderId', { schema: { tags: ['Orders'] } }, deleteOrder ) ;
  
     
}