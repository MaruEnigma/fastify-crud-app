import { createProduct } from './controller';
import type { FastifyInstance } from 'fastify'; 
import { createProductSchema } from './schema';
import { getAllProduct } from './controller';
import { get_All_Sellers_Product } from './controller';
import { deleteAllProducts } from './controller';
import { deleteProductbyID } from './controller';
import { updateProduct } from './controller';
import { updateProductSchema } from './schema';





export default async function productRoutes(fastify: FastifyInstance ) {
      fastify.post('/Products/:sellerId', { schema: createProductSchema }, createProduct );
      fastify.get('/Products/:sellerId', { schema: { tags: ['Products'] } }, getAllProduct ) ;
      fastify.get('/Products', { schema: { tags: ['Products'] } }, get_All_Sellers_Product ) ;
      fastify.delete('/Products', { schema: { tags: ['Products'] } }, deleteAllProducts ) ;
      fastify.delete('/Products/:id', { schema: { tags: ['Products'] } }, deleteProductbyID) ;
      fastify.put('/Products/:sellerId/:id', { schema: updateProductSchema, handler: updateProduct, } ) ;

}
