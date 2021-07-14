import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';

const index = (props) => (
  <ul>
    hello
  </ul>
);

index.getInitialProps = ({ store }) => store.getState();

export default connect()(index);
