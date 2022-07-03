import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
        primary: string
    }
    colors: {
      primary: string,
      background: string,
      text: string
    },
    space: array
  }
}
