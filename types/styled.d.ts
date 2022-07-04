import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
        primary: string,
        code: string
    },
    fontSize: {
      xsmall: string,
      small: string,
      medium: string,
      large: string,
      xlarge: string,
      xxlarge: string,
      huge: string
    },
    colors: {
      primary: string,
      primaryFaded: string,
      primaryOpacity08: string,
      background: string,
      text: string,
      sectionSeparator: string
    },
    space: array,
    layout: {
      navSize: string,
      contentSize: string,
      footerSize: string
    }
  }
}
