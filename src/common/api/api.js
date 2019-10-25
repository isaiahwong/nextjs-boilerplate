import fetch from '../fetch';

export default class Api {
  constructor() {
    this.fetch = (url, options = {}) => {
      if (options.body) {
        // eslint-disable-next-line no-param-reassign
        options.body = JSON.stringify(options.body);
      }
      return fetch(`/api/${options.version || 'v1'}${url}`, options);
    };
  }
}
