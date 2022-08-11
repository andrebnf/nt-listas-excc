import styled, { DefaultTheme } from "styled-components";

interface ButtonProps {
  theme: DefaultTheme,
  variant: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>`
  padding: ${({theme}) => theme.space[0]} ${({theme}) => theme.space[2]};
  background-color: ${({theme, variant}) => variant === 'primary' ? theme.colors.primary : theme.colors.secondaryOpacity015};
  color: ${({theme, variant}) => variant === 'primary' ? 'white' : theme.colors.secondary};
  
  font-size: ${({theme}) => theme.fontSize.medium};
  border-radius: ${({theme}) => theme.radii.regular};
  border: 0px;
  font-weight: bold;
  position: relative;

  svg {
    position: relative;
    top: -2px;
    width: ${({theme}) => theme.fontSize.large};
    height: ${({theme}) => theme.fontSize.large};
    margin-right: ${({theme}) => theme.space[1]};
  }

  &:hover, &:focus {
    cursor: pointer;
    top: -1px;
    right: -1px;
    box-shadow: ${({theme, variant}) => variant === 'primary' ? 'rgba(100, 25, 32, 0.2) -2px 2px 0px;' : theme.shadows.whiteNoSpread};
    color: ${({theme, variant}) => variant === 'primary' ? 'white' : theme.colors.primary};
    background-color: ${({theme, variant}) => variant === 'primary' ? 
      theme.colors.primaryOpacity09 : theme.colors.primaryOpacity01};
  }

  &:active {
    top: 0px;
    right: 0px;
    box-shadow: none;
    background-color: ${({theme, variant}) => variant === 'primary' ? theme.colors.primaryOpacity08 : '#EEE'};
    color: ${({theme, variant}) => variant === 'primary' ? theme.colors.primaryOpacity01 : theme.colors.text};
    outline: 2px solid ${({theme}) => theme.colors.sectionSeparator};
    outline-offset: -2px;
  }
`
