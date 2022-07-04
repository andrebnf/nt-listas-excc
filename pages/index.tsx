import type { NextPage } from 'next';
import styled from 'styled-components';

import { ExerciseDetails } from '../components/exerciseDetails';
import { ExerciseCode } from '../components/exerciseCode';
import { Sidebar } from '../components/sidebar';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr;

  height: ${({theme}) => theme.layout.contentSize};
`

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Sidebar></Sidebar>
      <ExerciseDetails></ExerciseDetails>
      <ExerciseCode></ExerciseCode>
    </PageContainer>
  )
}

export default Home
