import "dotenv/config";
import fastify from 'fastify';
import cors from "@fastify/cors"
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyRequest, FastifyReply } from 'fastify';
//import {routes} from './src/index';
import { routes } from "./src/index";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";
const app = fastify({ logger: true });


// Add a health check route
app.get("/health", async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ status: "CRUD Application is Running" });
});
app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  reply.redirect("/health");
});


// Enable CORS 
app.register(cors, {
  origin: '*', // allow all origins
  methods: ['GET', 'POST',  'PUT', 'DELETE'],
});


// Register Swagger plugin
app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Fastify CRUD API',
      description: 'Fastify Crud App.',
      version: '1.0.0'
    },

    servers: [
      {
        url: SERVER_URL
      }
    ],
   
  }}); 

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
    displayRequestDuration: true,
    tryItOutEnabled: true
  }
});

// Register routes

app.register(routes //, { prefix: '/api/v1' }
);

//start the server
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log('Server listening at ${address}');
});