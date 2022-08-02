import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

import { Footer } from '../components/footer'
import { Navigation } from '../components/navigation'
import AppLayout from '../components/layout/app-layout'

import Moment from 'react-moment'
import 'moment/locale/pt-br';
import PaginaManutencao from './manutencao'
Moment.globalLocale = 'pt-br';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' ? (
          <PaginaManutencao></PaginaManutencao>
        ) : (
          <AppLayout conteudoSidebar={pageProps.conteudoSidebar}>
            <Component {...pageProps} />
          </AppLayout>
        )}
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
