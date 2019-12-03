import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import NextApp, { Container } from 'next/app';

import reduxStore from '../redux/store';

class App extends NextApp {
  render() {
    const {
      store,
      pageProps,
      Component,
    } = this.props;
    return (
      <Container>
        <Provider store={store} >
          <Component {...pageProps} />
        </Provider>
      </Container>      
    );
  }
}

export default withRedux(reduxStore)(App);