import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { ExerciseSummary } from "../lib/exercises";

const StyledProSidebar = styled(ProSidebar)`
  width: ${({theme}) => theme.layout.sidebarWidth} !important;
  min-width: ${({theme}) => theme.layout.sidebarWidth} !important;

  &>div {
    background-color: ${({theme}) => theme.colors.secondaryOpacity01} !important;
  }

  .pro-inner-list-item {
    background-color: ${({theme}) => theme.colors.secondaryOpacity01} !important;
  }

  .pro-item-content, .pro-menu-item .pro-inner-item {
    font-weight: bold;

    &:hover, &:active, &.active {
      color: ${({theme}) => theme.colors.primary} !important;
    }

    &:visited {
      color: ${({theme}) => theme.colors.text} !important;

    }
  }

  .pro-item-content a {
    color: ${({theme}) => theme.colors.text} !important;
    &:hover {
      color: ${({theme}) => theme.colors.primary} !important;
    }
  }

  .pro-menu-item > .pro-inner-item:focus {
    color: ${({theme}) => theme.colors.primary} !important;
  }

  .react-slidedown {
    background-color: ${({theme}) => theme.colors.secondaryOpacity015} !important;
  }

  a.sidebar-item-active {
    color: ${({theme}) => theme.colors.primary} !important;
  }
`;

const StyledSidebarHeader = styled.h3`
  padding-left: 20px;
`;

interface SidebarProps {
  items: ExerciseSummary[];
  title: string;
}

// TODO: sidebar acessível em telas menores (https://github.com/azouaoui-med/react-pro-sidebar)
export const Sidebar = ({title, items}: SidebarProps) => {
  const router = useRouter();
  const currentSlug = router.query.slug

  return (
    <StyledProSidebar>
      <SidebarHeader>
        <StyledSidebarHeader>{title}</StyledSidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <SubMenu title="Módulo 4">
            <SubMenu title="Aula 3">
              {/* <MenuItem>
                <StyledReactIcon><GoBook/></StyledReactIcon> Aula
              </MenuItem> */}
               {items.map(({slug, title}) => (
                <MenuItem key={slug}>
                  <Link href={`/exercises/${slug}`}>
                    <a className={slug === currentSlug ? 'sidebar-item-active' : ''}>
                      {title}
                    </a>
                  </Link> 
                </MenuItem>
              ))}
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
    </StyledProSidebar>
  )
}