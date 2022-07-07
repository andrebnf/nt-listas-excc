import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { UserAuthProvider } from '../context/userAuth'

const isDevelopmentEnv = process.env.NODE_ENV === "development";

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] = awsconfig.oauth.redirectSignIn.split(",");
const [localRedirectSignOut, productionRedirectSignOut] = awsconfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsconfig,
  ssr: true,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isDevelopmentEnv ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isDevelopmentEnv ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserAuthProvider>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </UserAuthProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
