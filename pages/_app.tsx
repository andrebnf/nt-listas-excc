import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
