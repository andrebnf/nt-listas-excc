import { NextPage } from 'next';
import styled from 'styled-components';

import { getExercisesSummary } from '../lib/exercises';

export async function getStaticProps() {
  const exercisesSummary = getExercisesSummary()

  return {
    props: { exercisesSummary }
  }
}

const WelcomeTextContainer = styled.div`
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[2]};
`

const WelcomeText = styled.p`
  font-size: ${({theme}) => theme.fontSize.large};
`

const Home: NextPage = (_props: any) => {
  return (
    <WelcomeTextContainer>
      <h1>Curso Online de Programação</h1>
      <h2>Núcleo de Tecnologia - MTST</h2>
      <WelcomeText>
        Bem vinde ao portal do Curso Online de Programação! <br/>
        Use o menu à esquerda para acessar os exercícios. Na <br/>
        página do exercício é possível programar a solução <br/>
        utilizando JavaScrpt, mas para isso é necessário fazer<br/>
        login utilizando sua conta do Google.
      </WelcomeText>
    </WelcomeTextContainer>    
  )
}

export default Home;
