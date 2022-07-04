import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  fonts: {
    primary: 'Nunito'
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
    text: '#444',
    sectionSeparator: '#AAA'
  },
  space: [
    '4px', '8px', '12px', '16px', '24px', '32px',
    '48px', '64px', '96px', '128px', '192px', '256px'
  ],
  layout: {
    navSize: '8vh',
    contentSize: '88vh',
    footerSize: '4vh'
  }
};