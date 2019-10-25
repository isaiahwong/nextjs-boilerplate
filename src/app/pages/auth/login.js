import React from 'react';
import { connect } from 'react-redux';

import withAuth from '../../components/auth/withAuth';
import authApi from '../../../common/api/auth';

const index = (props) => (
  <ul>
      signing in...
    <button
      type="button"
      onClick={() => {
        authApi.signin({
          body: {
            email: 'isaiah.wong@jirehsoho.com',
            password: 'password',
            captcha_token: 'a'
          }
        }).then((res) => res.json()).then((d) => console.log(d));
      }}
    >
      Signin
    </button>
  </ul>
);

export default connect()(withAuth(index, { redirectIfAuth: true }));
