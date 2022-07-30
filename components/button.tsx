import styled from "styled-components";

export const Button = styled.button`
  padding: ${({theme}) => theme.space[0]} ${({theme}) => theme.space[2]};
  background-color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.primary};
  color: white;
  font-size: ${({theme}) => theme.fontSize.large};

  svg {
    position: relative;
    top: -2px;
    width: ${({theme}) => theme.fontSize.large};
    height: ${({theme}) => theme.fontSize.large};
    margin-right: ${({theme}) => theme.space[1]};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.primaryOpacity08};
  }
`
