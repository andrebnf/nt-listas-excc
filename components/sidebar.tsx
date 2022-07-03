import styled from "styled-components";

// const NavBar = styled.nav`
//   width: 100%;
//   padding: ${({theme}) => theme.space[4]};
//   background-color: ${({theme}) => theme.colors.primary};
// `

const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  padding-left: ${({theme}) => theme.space[5]};
  padding-right: ${({theme}) => theme.space[7]};
  padding-top: ${({theme}) => theme.space[8]};
  /* width: ${({theme}) => theme.space[9]}; */
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
`

const TopicsList = styled.ul`
  list-style: none;
  padding-left: 0;
  
  li {
    padding-bottom: ${({theme}) => theme.space[0]};
  }
`

const ExercisesList = styled.ul`
  list-style: none;
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[1]};
  padding-bottom: ${({theme}) => theme.space[1]};
`

export const Sidebar = (props: any) => (
  <SidebarContainer>
    <h3>📔Módulos</h3>
    <TopicsList>
      <li>
        Módulo 1
        <ExercisesList>
          <li>
            Lista 1
          </li>
          <li>
            Lista 2
          </li>
          <li>
            Lista 3
          </li>
        </ExercisesList>
      </li>
      <li>
        Módulo 2
      </li>
      <li>
        Módulo 3
      </li>
    </TopicsList>
  </SidebarContainer>
)