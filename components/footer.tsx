import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  background-color: ${({theme}) => theme.colors.secondaryOpacity02};
  height: ${({theme}) => theme.layout.footerSize};
  display: flex;
  align-items: center;
  justify-content: center;
`

const FooterText = styled.h5`
  font-weight: normal;
`

export const Footer = (_props: any) => (
  <StyledFooter>
    <FooterText>Desenvolvido pelo Núcleo de Tecnologia do MTST</FooterText>
  </StyledFooter>
)
