import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withStore from '../store/withStore';

class MyApp extends App {
  componentDidMount() {
    // const data = document.getElementById('__NEXT_DATA__');
    // if (data) {
    //   data.innerHTML = '';
    // }
    // // clears data sent to client after hydration
    // delete window.window.__NEXT_DATA__;
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withStore(MyApp);
