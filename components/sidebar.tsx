import Link from "next/link";
import styled, { DefaultTheme } from "styled-components";
import { Collapse } from 'react-collapse';
import { useRouter } from "next/router";
import { ContentSummary } from "../lib/exercises";
import { ReactNode, useState } from "react";
import { KeyboardArrowRight } from "@styled-icons/material-rounded/KeyboardArrowRight"

const StyledAside = styled.aside`
  min-width: ${({theme}) => theme.layout.sidebarWidth};

  background-color: ${({theme}) => theme.colors.secondaryOpacity01};

  .ReactCollapse--collapse {
    transition: height 200ms ease-out;
  }

  a {
    color: ${({theme}) => theme.colors.text}; 
  }
`;

const SidebarHeader = styled.h3`
  margin: 0;
  padding: ${({theme}) => theme.space[3]};
  border-bottom: 1px solid ${({theme}) => theme.colors.secondaryOpacity02};
`;

const SubMenuHeader = styled.a`
  margin: 0;
  padding-top: ${({theme}) => theme.space[2]};
  padding-right: 0;
  padding-bottom: ${({theme}) => theme.space[2]};
  padding-left: ${({theme}) => theme.space[3]};
  position: relative;

  font-weight: bold;
  display: block;
  font-size: ${({theme}) => theme.fontSize.medium};

  &:hover {
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary};
  }
`;

const SubMenuList = styled.ul`
  margin: 0;
  padding-top: ${({theme}) => theme.space[0]};
  padding-right: 0;
  padding-bottom: ${({theme}) => theme.space[0]};
  padding-left: ${({theme}) => theme.space[3]};
  
  list-style: none;
  background-color: ${({theme}) => theme.colors.secondaryOpacity015};
`;

const SidebarContent = styled.div`
`;

const Menu = styled.div`
`;

const MenuItem = styled.li`
  padding-bottom: ${({theme}) => theme.space[0]};
  padding-left: ${({theme}) => theme.space[3]};
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

const StyledArrowIcon = styled(KeyboardArrowRight)<{ theme: DefaultTheme, isPointingDown: boolean }>`
  position: absolute;
  right: ${({theme}) => theme.space[2]};
  width: ${({theme}) => theme.iconSize.medium};
  color: ${({theme}) => theme.colors.sectionSeparator};

  transition: all 100ms ease-in;
  transform: ${({isPointingDown}) => isPointingDown ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

interface SidebarProps {
  items: ContentSummary[];
  title: string;
}

const SubMenu = ({title, children}: { 
  title: string, 
  children: ReactNode 
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
    <>
      <SubMenuHeader onClick={() => setIsOpened(!isOpened)}>
        {title}
        <StyledArrowIcon isPointingDown={isOpened}></StyledArrowIcon>
      </SubMenuHeader>
      <Collapse isOpened={isOpened}>
        <SubMenuList>
          {children}
        </SubMenuList>
      </Collapse>
    </>
  )
}

export const Sidebar = ({title, items}: SidebarProps) => {
  const activeItemClass = 'sidebar-item-active'
  const router = useRouter()
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
                        <StyledNavLink activeClassName={activeItemClass} className={slug === currentSlug ? activeItemClass : ''}>
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
                        <StyledNavLink activeClassName={activeItemClass}  className={slug === currentSlug ? activeItemClass : ''}>
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