import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import AppLayout from '../components/layout/app-layout'

import Manutencao from '../components/pages/manutencao'

import Moment from 'react-moment'
import 'moment/locale/pt-br';
Moment.globalLocale = 'pt-br';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return (
      <ThemeProvider theme={theme}>
        <Manutencao/>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigation />
        <AppLayout conteudoSidebar={pageProps.conteudoSidebar}>
          <Component {...pageProps} />
        </AppLayout>
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
