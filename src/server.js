import path from 'path';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import logger from 'esther';
import { capitalize } from 'lodash';

import morgan from './middleware/morgan';
import responseHandler from './middleware/responseHandler';

class HttpServer {
  constructor({
    nodeEnv,
    name,
    port,
    router
  }) {
    this.server = express();
    this.nodeEnv = nodeEnv || 'development';
    this.name = name || 'Server';
    this.router = router || express.router();
    this.server.set('port', port || 3000);
  }

  attachMiddleware() {
    this.server.use(helmet());
    this.server.use(helmet.hidePoweredBy({ setTo: '' }));

    this.server.set('trust proxy', true);
    this.server.use(cookieParser());

    // Logs every request
    this.server.use(morgan);
    this.server.use(responseHandler);

    this.server.use(express.static(path.resolve(__dirname, 'public')));
    this.server.use(this.router);
  }

  listen() {
    this.attachMiddleware();
    this.http = http.createServer();

    this.http.on('request', this.server);
    this.http.listen(this.server.get('port'), () => {
      logger.info(`[${capitalize(this.nodeEnv)}] ${this.name} listening on port ${this.server.get('port')}`);
    });
  }
}

export default HttpServer;
