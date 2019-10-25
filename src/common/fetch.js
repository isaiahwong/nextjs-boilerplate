import fetch from 'isomorphic-fetch';
import https from 'https';

const gatewayService = typeof window === 'undefined' ? process.env.GATEWAY_SERVICE || 'https://localhost' : '';

export default function _fetch(url, options = {}) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST',
    mode: gatewayService ? 'cors' : 'same-origin',
    credentials: gatewayService ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.cookie ? { Cookie: options.cookie } : null)
    },
    agent: new https.Agent({
      rejectUnauthorized: false
    }),
    rejectUnauthorized: false
  };

  return fetch(`${gatewayService}${url}`, {
    ...defaults,
    ...options,
    headers: {
      ...defaults.headers,
      ...(options && options.headers)
    }
  });
}
