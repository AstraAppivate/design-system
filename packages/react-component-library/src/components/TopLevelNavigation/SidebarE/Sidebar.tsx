import React from 'react'
import styled from 'styled-components'
import { selectors } from '@royalnavy/design-tokens'

import { SidebarHandle } from './SidebarHandle'
import { SidebarUserProps } from './SidebarUser'
import { ComponentWithClass } from '../../../common/ComponentWithClass'
import { SidebarContext, SidebarProvider } from './context'

interface SidebarProps extends ComponentWithClass {
  icon?: React.ReactNode
  title?: string
  user?: React.ReactElement<SidebarUserProps>
}

interface StyledSidebarProps {
  isOpen?: boolean
}

const { color, spacing, fontSize } = selectors

const StyledSidebar = styled.aside<StyledSidebarProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ isOpen }) => (isOpen ? '18rem' : '3.75rem')};
  height: 100vh;
  background-color: ${color('neutral', '700')};
  color: ${color('neutral', 'white')};

  > a:hover {
    text-decoration: none;
  }
`

const StyledHead = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing('8')} ${spacing('6')};
  background-color: ${color('neutral', '800')};
`

const StyledIcon = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${color('neutral', '500')};
  padding: ${spacing('5')};
  margin-right: ${spacing('7')};

  svg > {
    font-size: ${fontSize('l')};
  }
`

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: ${fontSize('l')};
`

export const Sidebar: React.FC<SidebarProps> = ({
  icon,
  title,
  children,
  user,
}) => {
  return (
    <SidebarProvider>
      <SidebarContext.Consumer>
        {({ isOpen }) => (
          <StyledSidebar isOpen={isOpen}>
            <SidebarHandle />
            <StyledHead>
              {icon && <StyledIcon>{icon}</StyledIcon>}
              {isOpen && <StyledTitle>{title}</StyledTitle>}
            </StyledHead>
            {children}
            {user}
          </StyledSidebar>
        )}
      </SidebarContext.Consumer>
    </SidebarProvider>
  )
}

Sidebar.displayName = 'Sidebar'
