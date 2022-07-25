import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  fonts: {
    primary: 'Nunito',
    code: '"Fira code", "Fira Mono", monospace'
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
    primaryOpacity08: '#e26b9b',
    primaryOpacity01: '#fbecf2',
    secondary: '#013ba2',
    secondaryOpacity02: '#ccd8ec',
    secondaryOpacity015: '#d9e2f1',
    secondaryOpacity01: '#e5ebf6',
    text: '#444',
    textDarkGray: '#666',
    sectionSeparator: '#AAA',
    codeBlockBorder: '#CCC',
    white: '#DDD',
  },
  space: [
    '4px', '8px', '12px', '16px', '24px', '32px',
    '48px', '64px', '96px', '128px', '192px', '256px'
  ],
  iconSize: {
    small: '16px',
    large: '48px'
  },
  layout: {
    navSize: '8vh',
    contentSize: '88vh',
    footerSize: '4vh',
    sidebarWidth: '230px'
  }
};