import type { FastifyInstance } from 'fastify'; 
import { createWallet, GetAllWallets, updateWallet } from "./controller";

import { createWalletSchema } from './schema'; 
import { getWalletbyId } from './controller';
import { updateWalletSchema } from './schema';
import { deleteAllWallets } from './controller';
import { deleteWalletbyId } from './controller';



export default async function walletRoutes(fastify: FastifyInstance ) {
      fastify.post('/Wallet', { schema: createWalletSchema }, createWallet );
      fastify.get('/Wallet/:user_id', { schema: { tags: ['Wallets'] } }, getWalletbyId);
      fastify.put('/Wallet/:user_id', { schema: updateWalletSchema} , updateWallet);
      fastify.get('/Wallet', { schema: { tags: ['Wallets'] } }, GetAllWallets );
      fastify.delete('/Wallets', { schema: {tags: ['Wallets'] } } , deleteAllWallets );
      fastify.delete('/Wallets/:id', { schema: {tags: ['Wallets'] } } , deleteWalletbyId );

      
    
}
