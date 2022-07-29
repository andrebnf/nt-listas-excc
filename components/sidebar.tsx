import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ContentSummary } from "../lib/exercises";
import React, { ReactNode } from "react";

const SidebarHeader = styled.div`

`;

const SidebarContent = styled.div`
  
`;

const Menu = styled.div`
  
`;

const MenuItem = styled.li`

`;

const StyledAside = styled.aside`
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
  items: ContentSummary[];
  title: string;
}

const SubMenu = ({title, children}: { title: string, children: ReactNode }) => (
  <>
    <h3>{title}</h3>
    <ul>
      {/* {React.Children.map(children, (child: ReactNode) => (
        <li>{child}</li>
      ))} */}
      {children}
    </ul>
  </>
)

// TODO: sidebar acessível em telas menores (https://github.com/azouaoui-med/react-pro-sidebar)
export const Sidebar = ({title, items}: SidebarProps) => {
  const router = useRouter();
  const currentSlug = router.query.slug

  return (
    <StyledAside>
      <SidebarHeader>
        <StyledSidebarHeader>{title}</StyledSidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <SubMenu title="Módulo 4">
            <SubMenu title="Aula 3">
              {/* <MenuItem>
                <StyledReactIcon><GoBook/></StyledReactIcon> Aula
              </MenuItem> */}
              {items.map(({slug, title, moduleId, classId}) => {
                if (moduleId === '4' && classId === '3') {
                  return (
                    <MenuItem key={slug}>
                      <Link href={`/exercises/${slug}`}>
                        <a className={slug === currentSlug ? 'sidebar-item-active' : ''}>
                          {title}
                        </a>
                      </Link> 
                    </MenuItem>
                  )
                }    
              })}
            </SubMenu>
            <SubMenu title="Aula 4">
              {items.map(({slug, title, moduleId, classId}) => {
                if (moduleId === '4' && classId === '4') {
                  return (
                    <MenuItem key={slug}>
                      <Link href={`/exercises/${slug}`}>
                        <a className={slug === currentSlug ? 'sidebar-item-active' : ''}>
                          {title}
                        </a>
                      </Link> 
                    </MenuItem>
                  )
                }    
              })}
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
    </StyledAside>
  )
}