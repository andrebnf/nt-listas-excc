import Link from "next/link";
import styled, { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { ContentSummary } from "../lib/exercises";
import { ReactNode } from "react";

const StyledAside = styled.aside`
  min-width: ${({theme}) => theme.layout.sidebarWidth};
  padding-left: ${({theme}) => theme.space[2]};

  background-color: ${({theme}) => theme.colors.secondaryOpacity01};
`;

const SidebarHeader = styled.h3`
  margin: ${({theme}) => theme.space[2]} 0;
`;

const SubMenuHeader = styled.h4`
  padding-left: ${({theme}) => theme.space[2]};
  margin: ${({theme}) => theme.space[1]} 0;
`;

const SubMenuList = styled.ul`
  list-style: none;
  padding-left: ${({theme}) => theme.space[2]};

  transition: max-height .6s ease;
  overflow: hidden;
  max-height: 0;

  &.open {
    max-height: 400px;
  }
`;

const SidebarContent = styled.div`
`;

const Menu = styled.div`
`;

const MenuItem = styled.li`
  padding-bottom: ${({theme}) => theme.space[0]};
`;

const StyledNavLink = styled.a<{theme: DefaultTheme, activeClassName: string }>`
  text-decoration: none;
  
  &.${(props => props.activeClassName)} {
    color: ${({theme}) => theme.colors.primary};
  }

  &:hover {
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary};
  }
`

interface SidebarProps {
  items: ContentSummary[];
  title: string;
}

const SubMenu = ({title, children}: { title: string, children: ReactNode }) => (
  <>
    <SubMenuHeader>{title}</SubMenuHeader>
    <SubMenuList>
      {children}
    </SubMenuList>
  </>
)

// TODO: sidebar acessível em telas menores (https://github.com/azouaoui-med/react-pro-sidebar)
export const Sidebar = ({title, items}: SidebarProps) => {
  const activeClass = 'sidebar-item-active'
  const router = useRouter();
  const currentSlug = router.query.slug

  return (
    <StyledAside>
      <SidebarHeader>{title}</SidebarHeader>
      <SidebarContent>
        <Menu>
          <SubMenu title="Módulo 4">
            <SubMenu title="Aula 3">
              {items.map(({slug, title, moduleId, classId}) => {
                if (moduleId === '4' && classId === '3') {
                  return (
                    <MenuItem key={slug}>
                      <Link href={`/exercises/${slug}`}>
                        <StyledNavLink activeClassName={activeClass} className={slug === currentSlug ? activeClass : ''}>
                          {title}
                        </StyledNavLink>
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
                        <StyledNavLink activeClassName={activeClass}  className={slug === currentSlug ? activeClass : ''}>
                          {title}
                        </StyledNavLink>
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