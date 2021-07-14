import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';
import styles from './index.module.scss';

const index = (props) => (
  <div>
    index
    <br />
    <Link href="/auth/login">
      <a>login</a>
    </Link>
    <br />
    <Link href="/profile" >
      <a className={styles.test}>profiles</a>
    </Link>
  </div>
);

index.getInitialProps = ({ store }) => store.getState();

export default connect()(index);
