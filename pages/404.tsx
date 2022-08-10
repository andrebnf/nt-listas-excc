import Link from 'next/link'
import styled from 'styled-components'

import { getConteudo } from '../lib/conteudo';

export function getStaticProps() {
  const conteudoSidebar = getConteudo()

  return {
    props: { conteudoSidebar }
  }
}

const Error404Container = styled.div`
  padding-left: ${({theme}) => theme.space[4]};
  padding-top: ${({theme}) => theme.space[2]};
`

export default function Pagina404() {
  return <Error404Container>
    <h1>Página não encontrada 🥴</h1>
    <Link href="/">
      <a>
        Voltar para a página inicial
      </a>
    </Link>
  </Error404Container>
}
