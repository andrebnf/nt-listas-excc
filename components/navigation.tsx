import styled from "styled-components";

const NavBar = styled.nav`
  width: 100%;
  padding: ${({theme}) => theme.space[4]};
  background-color: ${({theme}) => theme.colors.primary};
  z-index: 0;
`

const NavTitle = styled.h3`
  color: white;
  padding: 0;
  margin: 0;
`

export const Navigation = (props: any) => (
  <NavBar>
    <NavTitle>Listas de Exercícios do Curso Online</NavTitle>
  </NavBar>
)