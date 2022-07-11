import { NextPage } from 'next';
import styled from 'styled-components';

import { PageContainer } from '../components/page-container';

import { Sidebar } from '../components/sidebar';
import { getExercisesSummary } from '../lib/exercises';

export async function getStaticProps() {
  const exercisesSummary = getExercisesSummary()

  return {
    props: { exercisesSummary }
  }
}

const PlaceholderText = styled.div`
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[2]};
`

const Home: NextPage = ({ exercisesSummary }: any) => {
  return (
    <PageContainer columns={2}>
      <Sidebar title="Exercícios" items={exercisesSummary}></Sidebar>
      <PlaceholderText>
        <h1>Curso Online de Programação</h1>
        <h2>Núcleo de Tecnologia - MTST</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores debitis, <br/>
          iusto magni consequatur suscipit, ullam animi possimus maxime, earum eius <br/>
          impedit quo omnis ab iste inventore quae excepturi distinctio totam.
        </p>
      </PlaceholderText>    
    </PageContainer>
  )
}

export default Home;
