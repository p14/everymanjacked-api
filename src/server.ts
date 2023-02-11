import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import { UserService } from './service/user';
import './controller/home';
import './controller/user';

const PORT = process.env.PORT || 8000;

// load everything needed to the Container
const container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(PORT);

console.log(`Express app listening on port ${PORT}`);
