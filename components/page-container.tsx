import styled from "styled-components";

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
  grid-template-columns: 0.5fr 1fr 1.5fr;
`

const TwoColumnsPage = styled(ContainerBasis)`
  grid-template-columns: 0.5fr 2.5fr;
`

export const PageContainer = ({ columns, children }: PageContainerProps) => {
  return (
    <>
      {columns === 2 ? (
        <TwoColumnsPage>{children}</TwoColumnsPage>
      ) : (
        <ThreeColumnsPage>{children}</ThreeColumnsPage>
      )}
    </>
  )
}