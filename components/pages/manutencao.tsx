import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const WelcomeTextContainer = styled.div`
  padding-left: ${({theme}) => theme.space[8]};
  padding-top: ${({theme}) => theme.space[8]};

  * {
    font-family: ${({theme}) => theme.fonts.primary}
  }
`

const Text = styled.p`
  font-size: ${({theme}) => theme.fontSize.large};
  margin: 0;
`

const Manutencao: NextPage = (_props: any) => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [])

  return (
    <>
      <Head>
        <title>NT Online - Em manutenção 👷‍♀️</title>
        <meta name="robots" content="noindex"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <WelcomeTextContainer>
        <h1>A ferramenta de aprendizado <br/> está em manutenção 👷‍♀️</h1>
        <div>
          <Text>Desculpe pelo incoveniente, voltaremos em breve!</Text>
          <Text>&mdash; Núcleo de Tecnologia ✊</Text>
        </div>
      </WelcomeTextContainer>    
    </>
  )
}

export default Manutencao;
