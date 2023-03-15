/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './constants/config';
import container from './ioc.config';
import dbConnect from './utils/dbConnector';

const PORT = process.env.PORT || 8000;

// Start the server
const server = new InversifyExpressServer(container);

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
