import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import corsOptions from './constants/config';
import container from './ioc.config';
import dbConnect from './utils/dbConnector';
import AuthProvider from './providers/auth.provider';
// import { auth } from 'express-openid-connect';

const PORT = process.env.PORT || 8000;

// Setup Express App to pass into InversifyExpressServer
// Ensures server middleware gets bound first before Inversify Utils
const app = express();

// Start the server
const server = new InversifyExpressServer(container, null, null, app, AuthProvider);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
});

const serverInstance = server.build();

dbConnect().then(() => {
    serverInstance.listen(PORT, async () => {
        console.log(`Express app listening on port ${PORT}`);
    });
});
