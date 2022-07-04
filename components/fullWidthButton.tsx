import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 100%;

  & > button {
    width: 100%;
  }
`

const Button = styled.button`
  line-height: ${({theme}) => theme.space[6]};
  background-color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.primary};
  color: white;
  font-size: ${({theme}) => theme.fontSize.xlarge};
  font-family: inherit;
  cursor: pointer;
`

export const FullWidthButton = (props: any) => (
  <ButtonContainer>
    <Button>▶️ Executar Código</Button>
  </ButtonContainer>
)