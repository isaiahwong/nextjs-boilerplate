import logger from 'esther';
import fetch from '../common/fetch';
import authApi from '../common/api/auth';

const AUTH_SERVICE = process.env.AUTH_SERVICE || 'https://localhost/api/v1/auth/';

export async function redirectIfAuthenticated(req, res, next) {
  try {
    const { cookie } = req.headers;
    const response = await authApi.auth({ cookie });

    if (response.status === 200) {
      res.redirect('/'); return;
    }

    next();
  }
  catch (err) {
    logger.error(err);
    res.redirect('/');
  }
}

export default async function auth(req, res, next) {
  try {
    const response = await fetch(AUTH_SERVICE, {
      method: 'POST',
    });

    if (response.status > 400) {
      res.redirect('/'); return;
    }

    // const json = await response.json();
    // req.isAuthenticated = !!json.a;
    // req.user = (json.d && json.d.u) || undefined;
    next();
  }
  catch (err) {
    logger.error(err);
    res.redirect('/');
  }
}
