import { FastifyInstance } from 'fastify';
import userRoutes from '../src/routes/User'
import productRoutes from '../src/routes/Products';
import walletRoutes from './routes/Wallet';
import cartRoutes from './routes/Carts';
import orderRoutes from './routes/Order';


export async function routes(fastify: FastifyInstance) {
    await userRoutes(fastify) ;
    await productRoutes(fastify) ;
    await walletRoutes(fastify) ;
    await cartRoutes(fastify) ;
    await orderRoutes(fastify) ;
}
