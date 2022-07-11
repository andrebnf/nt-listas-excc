import Link from "next/link";
import styled from "styled-components";
import { ExerciseSummary } from "../lib/exercises";
import { VscFileCode } from 'react-icons/vsc'

const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.colors.secondaryOpacity02};
  padding-left: ${({theme}) => theme.space[5]};
  padding-right: ${({theme}) => theme.space[7]};
  padding-top: ${({theme}) => theme.space[2]};
`

const SidebarList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding-bottom: ${({theme}) => theme.space[0]};
  }
`

const StyledA = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: bold;

  &:hover, &:focus {
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary};
  }
`

const StyledIcon = styled(VscFileCode)`
  top: 2px;
  position: relative;
`

interface SidebarProps {
  items: ExerciseSummary[];
  title: string;
}

// TODO: marcar item ativo na sidebar (useRouter().query === slug)
export const Sidebar = ({title, items}: SidebarProps) => (
  <SidebarContainer>
    <h3>{title}</h3>
    <SidebarList>
      {items.map(({slug, title}) => (
        <li key={slug}>
          <Link href={`/exercises/${slug}`}>
            <StyledA><StyledIcon/> {title}</StyledA>
          </Link>
        </li>
    ))}
    </SidebarList>
  </SidebarContainer>
)