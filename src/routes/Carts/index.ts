import type { FastifyInstance } from 'fastify'; 
import { createCart } from './controller';
import { createCartSchema } from './schema';
import { getCartByUserId } from './controller';
import { getCartByUserIdSchema } from './schema';
import { addItem, DeleteItem } from './cart_items';
import { addItemsSchema } from './schema';
import { updateProductquantity } from './cart_items';
import { updateProductQuantitySchema } from './schema';
import { DeleteProductSchema  } from './schema';
import { GetAllCarts } from './controller';


export default async function cartRoutes(fastify: FastifyInstance ) {

    fastify.post('/Carts', { schema: createCartSchema}, createCart );
    fastify.get('/Carts/:PurchaserId', { schema: getCartByUserIdSchema }, getCartByUserId );
    fastify.post('/cart_items/:Cartid', {schema: addItemsSchema}, addItem);
    fastify.put('/cart_items/:Cartid', {schema: updateProductQuantitySchema }, updateProductquantity ) ;
    fastify.delete('/cart_items/:Cartid', {schema: DeleteProductSchema }, DeleteItem );
    fastify.get('/Carts', {schema: { tags: ['Carts'] } }, GetAllCarts ) ;
}
