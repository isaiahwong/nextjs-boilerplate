import Api from './api';

class Auth extends Api {
  signin(options) {
    return this.fetch('/auth/signin', options);
  }

  auth(options) {
    return this.fetch('/auth', options);
  }
}

export { Auth };
export default new Auth();
