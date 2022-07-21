import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import AppLayout from '../components/layout/app-layout'

import 'highlight.js/styles/xcode.css'
import 'react-pro-sidebar/dist/css/styles.css';

import Moment from 'react-moment'
import 'moment/locale/pt-br';
Moment.globalLocale = 'pt-br';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <AppLayout exercisesSummary={pageProps.exercisesSummary}>
          <Component {...pageProps} />
        </AppLayout>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
