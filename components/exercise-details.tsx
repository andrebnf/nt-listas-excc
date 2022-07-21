import styled from "styled-components";

const ExerciseDetailsContainer = styled.div`
  padding-top: ${({theme}) => theme.space[2]};
  padding-left: ${({theme}) => theme.space[4]};
  padding-right: ${({theme}) => theme.space[2]};
  max-height: ${({theme}) => theme.layout.contentSize};
  overflow-y: auto;

  pre {
    border: 1px solid ${({ theme }) => theme.colors.codeBlockBorder};
    color: ${({ theme }) => theme.colors.textDarkGray};
    padding: ${({theme}) => theme.space[2]};
    overflow: auto;
  }
`

const ExerciseText = styled.div`
    font-size: ${({theme}) => theme.fontSize.large};
`

interface ExerciseDetailsProps {
  breadcrumb: string,
  content: string,
  title: string
}

export const ExerciseDetails = ({breadcrumb, content, title}: ExerciseDetailsProps) => (
  <ExerciseDetailsContainer>
    <h4>{breadcrumb}</h4>
    <h1>{title}</h1>

    <ExerciseText dangerouslySetInnerHTML={{ __html: content }} />
  </ExerciseDetailsContainer>  
)