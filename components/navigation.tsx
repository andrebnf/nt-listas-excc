import styled from "styled-components";

const NavBar = styled.nav`
  width: 100%;
  padding: 0 ${({theme}) => theme.space[4]};
  background-color: ${({theme}) => theme.colors.primary};
  height: ${({theme}) => theme.layout.navSize};
  display: flex;
  align-items: center;
`

const NavTitle = styled.h3`
  color: white;
  padding: 0;
  margin: 0;
`

export const Navigation = (props: any) => (
  <NavBar>
    <NavTitle>Listas de Exercícios - Curso Online</NavTitle>
  </NavBar>
)