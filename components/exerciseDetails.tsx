import styled from "styled-components";

const ExerciseDetailsContainer = styled.div`
  padding-top: ${({theme}) => theme.space[2]};
  padding-left: ${({theme}) => theme.space[4]};
  padding-right: ${({theme}) => theme.space[2]};
`

const ExerciseText = styled.p`
  font-size: ${({theme}) => theme.fontSize.xlarge};
`

export const ExerciseDetails = (props: any) => (
  <ExerciseDetailsContainer>
    <h4>Módulo 1 &gt; Lista 1 &gt; Exercício 3</h4>

    <ExerciseText>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repudiandae, asperiores explicabo quas numquam quae assumenda voluptas ipsa expedita iusto doloribus eos laudantium suscipit provident rerum illum nostrum mollitia nesciunt?
    </ExerciseText>
  </ExerciseDetailsContainer>  
)