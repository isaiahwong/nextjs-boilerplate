import React from 'react';
import configureStore from './configureStore';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (App) => class AppWithRedux extends React.Component {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const store = getOrCreateStore();

    // Provide the store to getInitialProps of pages
    // eslint-disable-next-line no-param-reassign
    appContext.ctx.store = store;

    let appProps = {};
    if (typeof App.getInitialProps === 'function') {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
      initialReduxState: store.getState()
    };
  }

  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    this.store = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <App {...this.props} store={this.store} />;
  }
};
