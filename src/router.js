import next from 'next';
import express from 'express';
import bodyParser from 'body-parser';
import Proxy from './lib/proxy';

import auth, { redirectIfAuthenticated } from './middleware/auth';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: `${__dirname}/app` });
const expressRouter = express.Router();

export default async function router() {
  await app.prepare();
  const handle = app.getRequestHandler();

  // Api routing should be handled by ingress in production
  if (__DEV__) {
    expressRouter.post('/api/*', (req, res) => {
      Proxy.web(req, res, {
        target: 'https://localhost'
      });
    });
  }
  expressRouter.use(bodyParser.urlencoded({ extended: true }));
  expressRouter.use(bodyParser.json());

  expressRouter.get('/auth/login', redirectIfAuthenticated);

  expressRouter.use('/profile', auth);
  expressRouter.get('*', (req, res) => handle(req, res));
  return expressRouter;
}
