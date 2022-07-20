import styled from "styled-components";

export const Button = styled.button`
  padding: ${({theme}) => theme.space[0]} ${({theme}) => theme.space[2]};
  background-color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.primary};
  color: white;
  font-size: ${({theme}) => theme.fontSize.large};
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.primaryOpacity08};
  }
`
