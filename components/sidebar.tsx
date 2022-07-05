import Link from "next/link";
import styled from "styled-components";

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

interface SidebarProps {
  items: {title: string, slug: string}[];
  title: string;
}

export const Sidebar = ({title, items}: SidebarProps) => (
  <SidebarContainer>
    <h3>{title}</h3>
    <SidebarList>
      {items.map(({slug, title}) => (
        <li key={slug}>
          <Link href={`/exercises/${slug}`}>
            <a className="hover:underline">{title}</a>
          </Link>
        </li>
    ))}
    </SidebarList>
  </SidebarContainer>
)