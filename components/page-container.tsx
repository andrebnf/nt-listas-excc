import styled from "styled-components"

interface PageContainerProps {
  columns: number,
  children: React.ReactNode
}

const ContainerBasis = styled.div`
  display: grid;

  height: ${({theme}) => theme.layout.contentSize};

  & > * {
    max-height: ${({theme}) => theme.layout.contentSize};
  }
`

const ThreeColumnsPage = styled(ContainerBasis)`
  grid-template-columns: 0.65fr 1fr 1.35fr;
`

const TwoColumnsPage = styled(ContainerBasis)`
  grid-template-columns: 0.65fr 2.35fr;
`

const OneColumnPage = styled(ContainerBasis)`
  grid-template-columns: 1fr;
`

export const PageContainer = ({ columns, children }: PageContainerProps) => {
  return (
    <>
      {columns === 1 && <OneColumnPage>{children}</OneColumnPage>}
      {columns === 2 && <TwoColumnsPage>{children}</TwoColumnsPage>}
      {columns === 3 && <ThreeColumnsPage>{children}</ThreeColumnsPage>}
    </>
  )
}