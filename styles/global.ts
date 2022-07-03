import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.fonts.primary}, 
        -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, label, legend, ol, ul, table {
    color: ${props => props.theme.colors.text}
  }

  body * {
    box-sizing: border-box;
  }
`;