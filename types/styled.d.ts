import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
        primary: string,
        code: string,
        codeEditor: string
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
      primaryOpacity09: string,
      primaryOpacity08: string,
      primaryOpacity01: string,
      secondary: string,
      secondaryOpacity02: string,
      secondaryOpacity015: string,
      secondaryOpacity01: string,
      background: string,
      text: string,
      textDarkGray: string,
      editorBorder: string,
      contentCodeBorder: string,
      sectionSeparator: string,
      white: string
    },
    space: array,
    iconSize: {
      small: string,
      medium: string,
      large: string,
      xlarge: string,
      xxlarge: string
    },
    layout: {
      navSize: string,
      contentSize: string,
      footerSize: string,
      sidebarWidth: string
    },
    radii: {
      small: string,
      regular: string,
      circular: string
    },
    shadows: {
      whiteNoSpread: string
    }
  }
}
