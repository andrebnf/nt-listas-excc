import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

import { UserAuthProvider } from '../context/userAuth'
import { UserNavigationProvider } from '../context/userNavigation'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserNavigationProvider>
          <UserAuthProvider>
            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </UserAuthProvider>
        </UserNavigationProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
