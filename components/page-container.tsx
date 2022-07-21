import styled from "styled-components"

interface PageContainerProps {
  children: React.ReactNode
}

const ContainerBasis = styled.div`
  display: grid;

  max-height: ${({theme}) => theme.layout.contentSize};

  & > * {
    max-height: ${({theme}) => theme.layout.contentSize};
  }
`

const TwoColumnsPage = styled(ContainerBasis)`
  grid-template-columns: 300px 2.35fr;
`

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <TwoColumnsPage>{children}</TwoColumnsPage>
  )
}