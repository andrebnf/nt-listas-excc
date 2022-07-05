import type { NextPage } from 'next';
import styled from 'styled-components';

import { ExerciseDetails } from '../components/exerciseDetails';
import { ExerciseCode } from '../components/exerciseCode';
import { Sidebar } from '../components/sidebar';
import { getExercisesSummary } from '../lib/exercises';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr;

  height: ${({theme}) => theme.layout.contentSize};

  & > * {
    max-height: ${({theme}) => theme.layout.contentSize};
  }
`

export async function getStaticProps() {
  const exercisesSummary = getExercisesSummary()

  return {
    props: { exercisesSummary }
  }
}

const Home: NextPage = ({ exercisesSummary }: any) => {
  return (
    <PageContainer>
      <Sidebar items={exercisesSummary}></Sidebar>
      <ExerciseDetails></ExerciseDetails>
      <ExerciseCode></ExerciseCode>
    </PageContainer>
  )
}

export default Home
