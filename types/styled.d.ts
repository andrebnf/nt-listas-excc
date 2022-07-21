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
      primaryOpacity01: string,
      secondary: string,
      secondaryOpacity02: string,
      secondaryOpacity015: string,
      secondaryOpacity01: string,
      background: string,
      text: string,
      textDarkGray: string,
      codeBlockBorder: string,
      sectionSeparator: string,
      white: string
    },
    space: array,
    iconSize: {
      small: string,
      large: string,
    },
    layout: {
      navSize: string,
      contentSize: string,
      footerSize: string
    }
  }
}
