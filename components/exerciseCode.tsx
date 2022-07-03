import styled from "styled-components";

const ExerciseDetailsContainer = styled.div`
  padding-top: ${({theme}) => theme.space[2]};
  padding-left: ${({theme}) => theme.space[2]};
  padding-right: ${({theme}) => theme.space[4]};
`

const ExerciseText = styled.p`
  font-size: ${({theme}) => theme.fontSize.xlarge};
`

export const ExerciseCode = (props: any) => (
  <ExerciseDetailsContainer>
    <h4>CODIGO</h4>
  </ExerciseDetailsContainer>  
)