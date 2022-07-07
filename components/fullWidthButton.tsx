import styled from "styled-components";
import { Button } from "./button";

const ButtonContainer = styled.div`
  width: 100%;

  & > button {
    width: 100%;
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