import styled from "styled-components";

export const InlineButton = styled.button`
  text-align: right;
  height: 20px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: unset;
  border: unset;
  outline: unset;
  font-size: ${({ theme }) => theme.fontSize.medium};
  
  &:hover, &:focus {
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary};
    text-decoration: underline;
  }
`