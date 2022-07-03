import styled from "styled-components";

const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  padding-left: ${({theme}) => theme.space[5]};
  padding-right: ${({theme}) => theme.space[7]};
  padding-top: ${({theme}) => theme.space[2]};
`

const ModulesList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding-bottom: ${({theme}) => theme.space[0]};
  }
`

const TopicsList = styled.ul`
  list-style: none;
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[1]};
  padding-bottom: ${({theme}) => theme.space[1]};
`

const ExercisesList = styled(TopicsList)`
  font-size: ${({theme}) => theme.fontSize.small};
`

export const Sidebar = (props: any) => (
  <SidebarContainer>
    <h3>📔Módulos</h3>
    <ModulesList>
      <li>
        Módulo 1
        <TopicsList>
          <li>
            Lista 1
            <ExercisesList>
              <li>
                Exercício 1
              </li>
            </ExercisesList>
          </li>
          <li>
            Lista 2
          </li>
          <li>
            Lista 3
          </li>
        </TopicsList>
      </li>
      <li>
        Módulo 2
      </li>
      <li>
        Módulo 3
      </li>
    </ModulesList>
  </SidebarContainer>
)