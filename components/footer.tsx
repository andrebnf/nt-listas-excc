import styled from "styled-components";

const NavBar = styled.nav`
  width: 100%;
  text-align: center;
  background-color: ${({theme}) => theme.colors.primaryFaded};
  height: ${({theme}) => theme.layout.footerSize};
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavTitle = styled.h6`
  font-weight: normal;
  padding: 0;
  margin: 0;
`

export const Footer = (props: any) => (
  <NavBar>
    <NavTitle>Feito com ❤️ pelo Núcleo de Tecnologia do MTST</NavTitle>
  </NavBar>
)