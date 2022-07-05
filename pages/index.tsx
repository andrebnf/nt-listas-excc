import type { NextPage } from 'next';
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
`

const Home: NextPage = ({ exercisesSummary }: any) => {
  return (
    <PageContainer columns={2}>
      <Sidebar title="Exercícios" items={exercisesSummary}></Sidebar>
      <PlaceholderText>
        <h1>Selecione um exercício ao lado</h1>
      </PlaceholderText>    
    </PageContainer>
  )
}

export default Home
