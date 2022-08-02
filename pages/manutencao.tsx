import { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import { getExercisesSummary } from '../lib/exercises';

export async function getStaticProps() {
  const exercisesSummary = getExercisesSummary()

  return {
    props: { exercisesSummary }
  }
}

const ContainerManutencao = styled.div`
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[2]};
  height: ${({theme}) => theme.layout.contentSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TextoManutencao = styled.p`
  font-size: ${({theme}) => theme.fontSize.xlarge};
  margin-top: 0;
  text-align: center;
`

const IconeManutencao = styled.span`
  font-size: ${({theme}) => theme.iconSize.xlarge};
  display: block;
`

const PaginaManutencao: NextPage = (_props: any) => {
  return (
    <>
      <Head>
        <title>Núcleo de Tecnologia - Curso Online - Manutenção</title>
      </Head>
      <ContainerManutencao>
        <IconeManutencao>⚠️</IconeManutencao>
        <h1>Manutenção</h1>
        <TextoManutencao>
          Desculpe pelo incoveniente. Em breve o site <br/>estará de volta em normal operação.
        </TextoManutencao>
      </ContainerManutencao>    
    </>
  )
}

export default PaginaManutencao;
