import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
  padding-left: ${({theme}) => theme.space[8]};
  padding-top: ${({theme}) => theme.space[8]};

  * {
    font-family: ${({theme}) => theme.fonts.primary}
  }

  p {
    font-size: ${({theme}) => theme.fontSize.large};
    margin: 0;
  }
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
      <TextContainer>
        <h1>A ferramenta de aprendizado <br/> está em manutenção 👷‍♀️</h1>
        <div>
          <p>Desculpe pelo incoveniente, voltaremos em breve!</p>
          <p>&mdash; Núcleo de Tecnologia ✊</p>
        </div>
      </TextContainer>    
    </>
  )
}

export default Manutencao;
