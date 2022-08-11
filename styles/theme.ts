import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  fonts: {
    primary: 'Nunito',
    code: '"Fira code", "Fira Mono"',
    codeEditor: 'monospace'
  },
  fontSize: {
    xsmall: '0.75em',
    small: '0.825em',
    medium: '1em',
    large: '1.125em',
    xlarge: '1.25em',
    xxlarge: '1.5em',
    huge: '1.75em'
  },
  colors: {
    primary: '#DB4682',
    background: '#FFF5E6',
    primaryFaded: '#eec5d5',
    primaryOpacity09: '#df588e',
    primaryOpacity08: '#e26b9b',
    primaryOpacity01: '#fbecf2',
    secondary: '#013ba2',
    secondaryOpacity02: '#ccd8ec',
    secondaryOpacity015: '#d9e2f1',
    secondaryOpacity01: '#e5ebf6',
    text: '#444',
    textDarkGray: '#666',
    sectionSeparator: '#AAA',
    editorBorder: '#ccd8ec',
    contentCodeBorder: '#DFDFDF',
    white: '#DDD',
  },
  space: [
    '4px', '8px', '12px', '16px', '24px', '32px',
    '48px', '64px', '96px', '128px', '192px', '256px'
  ],
  iconSize: {
    small: '16px',
    medium: '20px',
    large: '32px',
    xlarge: '48px',
    xxlarge: '64px'
  },
  layout: {
    navSize: '8vh',
    contentSize: '88vh',
    footerSize: '4vh',
    sidebarWidth: '220px'
  },
  radii: {
    small: '2px',
    regular: '4px',
    circular: '50%'
  },
  shadows: {
    whiteNoSpread: 'rgba(255, 255, 255, 0.5) -2px 2px 0px',
    darkNoSpread: 'rgba(100, 25, 32, 0.2) -2px 2px 0px',
    darkSpread: 'rgba(0, 0, 0, 0.2) -2px 2px 3px'
  }
};