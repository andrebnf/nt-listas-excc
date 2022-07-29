import styled from "styled-components"

interface PageContainerProps {
  children: React.ReactNode
}

const ContainerBasis = styled.div`
  display: flex;

  height: ${({theme}) => theme.layout.contentSize};

  & > * {
    max-height: ${({theme}) => theme.layout.contentSize};
  }
`

const TwoColumnsPage = styled(ContainerBasis)`
  /* grid-template-columns: ${({theme}) => theme.layout.sidebarWidth} 1fr; */
`

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <TwoColumnsPage>{children}</TwoColumnsPage>
  )
}