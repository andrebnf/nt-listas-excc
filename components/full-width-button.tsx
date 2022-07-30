import styled from "styled-components";
import { Button } from "./button";

const ButtonContainer = styled.div`
  width: 100%;

  & > button {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin: auto 0;
      width: ${({theme}) => theme.fontSize.xlarge};
      height: ${({theme}) => theme.fontSize.xlarge};
      margin-right: ${({theme}) => theme.space[1]};
    }
  }
`

interface FullWidthButtonProps {
  children: React.ReactNode,
  onClick(evt: any): void 
}

export const FullWidthButton = ({children, onClick}: FullWidthButtonProps) => (
  <ButtonContainer>
    <Button onClick={(evt) => { onClick(evt); evt.preventDefault() }}>
      {children}
    </Button>
  </ButtonContainer>
)