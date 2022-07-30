import Link from "next/link";
import styled, { css, DefaultTheme, useTheme } from "styled-components";
import { Collapse } from 'react-collapse';
import { useRouter } from "next/router";
import { ContentSummary } from "../lib/exercises";
import { ReactNode, useState } from "react";
import { KeyboardArrowRight } from "@styled-icons/material-rounded/KeyboardArrowRight"
import {  } from "@styled-icons/fluentui-system-filled/Dock"
import { ArrowFromRight, ArrowFromLeft } from "@styled-icons/boxicons-regular"

const StyledAside = styled.aside<{ theme: DefaultTheme, isDocked: boolean }>`
  overflow: auto;
  position: relative;
  z-index: 1;
  
  min-width: ${({theme, isDocked}) => isDocked ? theme.space[7] : theme.layout.sidebarWidth };
  width: ${({theme, isDocked}) => isDocked ? theme.space[7] : theme.layout.sidebarWidth };
  left: -${({theme, isDocked}) => isDocked ? theme.layout.sidebarWidth : '0px'};

  background-color: ${({theme}) => theme.colors.secondaryOpacity01};
  transition: all 100ms ease-out;

  .ReactCollapse--collapse {
    transition: height 200ms ease-out;
  }

  a {
    color: ${({theme}) => theme.colors.text}; 
  }
`;

const sidebarDockButtonsProps = ({ theme }: { theme: DefaultTheme }) =>
  css`
    width: ${theme.iconSize.large};
    color: ${theme.colors.secondary};

    &:hover {
      cursor: pointer;
      color: ${theme.colors.primary};
    }
  `

const SidebarDockButton = styled(ArrowFromRight)`
  ${sidebarDockButtonsProps}

  position: absolute;
  right: ${({theme}) => theme.space[2]};
  top: ${({theme}) => theme.space[2]};
`;

const SidebarUndockButton = styled(ArrowFromLeft)`
  ${sidebarDockButtonsProps}

  position: fixed;
  left: ${({theme}) => theme.space[4]};
  top: ${({theme}) => theme.layout.navSize};
  margin-top: ${({theme}) => theme.space[3]};
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
  padding-top: ${({theme}) => theme.space[2]};
`;

const Menu = styled.div`
`;

const MenuItem = styled.li`
  padding-bottom: ${({theme}) => theme.space[0]};
  padding-left: ${({theme}) => theme.space[3]};
`;

const StyledNavLink = styled.a<{theme: DefaultTheme, activeClassName: string }>`
  text-decoration: none;
  font-size: ${({theme}) => theme.fontSize.medium};
  
  &.${(props => props.activeClassName)} {
    color: ${({theme}) => theme.colors.primary};
  }

  &:hover {
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary};
    text-decoration: underline;
  }
`

const SubMenuArrow = styled(KeyboardArrowRight)<{ theme: DefaultTheme, isPointingDown: boolean }>`
  position: absolute;
  right: ${({theme}) => theme.space[2]};
  width: ${({theme}) => theme.fontSize.xlarge};
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
        <SubMenuArrow isPointingDown={isOpened}></SubMenuArrow>
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
  const [isDocked, setIsDocked] = useState<boolean>(false);
  const activeItemClass = 'sidebar-item-active'
  const router = useRouter()
  const currentSlug = router.query.slug

  return (
    <StyledAside isDocked={isDocked}>
      <SidebarHeader>
        {title}
        <SidebarDockButton onClick={() => setIsDocked(true)}></SidebarDockButton>
        {isDocked && (
          <SidebarUndockButton onClick={() => setIsDocked(false)}></SidebarUndockButton>
        )}
      </SidebarHeader>
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