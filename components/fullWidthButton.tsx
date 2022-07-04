import styled from "styled-components";
import { VscPlay } from 'react-icons/vsc';

const ButtonContainer = styled.div`
  width: 100%;

  & > button {
    width: 100%;
  }
`

const Button = styled.button`
  height: ${({theme}) => theme.space[6]};
  background-color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.primary};
  color: white;
  font-size: ${({theme}) => theme.fontSize.xlarge};
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.primaryOpacity08};
  }
`

export const FullWidthButton = ({children}: any) => (
  <ButtonContainer>
    <Button>
      {children}
    </Button>
  </ButtonContainer>
)