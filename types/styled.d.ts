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
      secondary: string,
      secondaryOpacity02: string,
      secondaryOpacity01: string,
      background: string,
      text: string,
      sectionSeparator: string,
      white: string
    },
    space: array,
    iconSize: {
      large: string,
    },
    layout: {
      navSize: string,
      contentSize: string,
      footerSize: string
    }
  }
}
