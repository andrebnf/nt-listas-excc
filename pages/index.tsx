import type { NextPage } from 'next';
import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';
import styled from 'styled-components';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const MySection = styled.section`
  border: 2px solid red;
  background-color: ${({theme}) => theme.colors.background};
`;

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle/>
        <MySection>
            ola
        </MySection>
      </>
    </ThemeProvider>
  )
}

export default Home
