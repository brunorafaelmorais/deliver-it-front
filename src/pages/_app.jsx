import Head from 'next/head';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyle from '@/shared/styles/globals';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deliver It | Challenge Front-end</title>
      </Head>
      <CssBaseline />
      <GlobalStyle />
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
