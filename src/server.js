import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload'
import cors from "cors"
import path from "path"
import http from 'http';

import "#config/index"

import context from "./context.js"


import schema from "./modules/index.js"

async function startApolloServer() {
    const app = express();
    app.use(graphqlUploadExpress())
    app.use(cors())
    app.use(express.static(path.join(process.cwd(), "uploads")))

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        context,
        uploads: {
            maxFileSize: 50000000, // 50 MB
            maxFiles: 30,
            maxFieldSize: 50000000 // 50 MB
        },
        csrfPrevention: false,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql"
    });
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
}
startApolloServer()