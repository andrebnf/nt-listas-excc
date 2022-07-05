import styled from "styled-components";

const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  padding-left: ${({theme}) => theme.space[5]};
  padding-right: ${({theme}) => theme.space[7]};
  padding-top: ${({theme}) => theme.space[2]};
`

const ExercisesList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding-bottom: ${({theme}) => theme.space[0]};
  }
`

interface SidebarProps {
  items: {title: string, slug: string}[]
}

export const Sidebar = ({items}: SidebarProps) => (
  <SidebarContainer>
    <h3>📔Módulos</h3>
    <ExercisesList>
      {items.map(({slug, title}) => {
        return <li key={slug}>{title}</li>
      })}
    </ExercisesList>
  </SidebarContainer>
)