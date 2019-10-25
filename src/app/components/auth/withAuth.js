import React from 'react';
import Router from 'next/router';

import authApi from '../../../common/api/auth';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return undefined;
}

export default (Child, options = {}) => class extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      return {};
    }
    const cookie = getCookie('devcookie');
    if (!cookie && options.redirectIfAuth) {
      return {};
    }
    const response = await authApi.auth();
    if (response.status < 400 && options.redirectIfAuth) {
      Router.push('/');
      return {};
    }
    if (response.status > 400 && !options.redirectIfAuth) {
      Router.push('/auth/login');
    }
    return {};
  }

  render() {
    return <Child {...this.props} />;
  }
};
