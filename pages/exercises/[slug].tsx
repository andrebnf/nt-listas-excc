import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useAuthState } from "react-firebase-hooks/auth";
import { TbFileCode2 } from 'react-icons/tb';
import styled from 'styled-components';
import { auth } from "../../firebase/clientApp";

import { ExerciseSummary, getExerciseBySlug, getExercisesSlugs, getExercisesSummary } from '../../lib/exercises'
import markdownToHtml from '../../lib/markdownToHtml'

import { ExerciseDetails } from '../../components/exerciseDetails'
import { PageContainer } from '../../components/page-container'
import { ExerciseCode } from '../../components/exerciseCode'
import { Sidebar } from '../../components/sidebar'

const NonLoggedContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const StyledIcon = styled(TbFileCode2)`
  width: ${({theme}) => theme.iconSize.large};
  height: ${({theme}) => theme.iconSize.large};
`;

interface ExerciseProps {
  title: string,
  breadcrumb: string,
  slug: string,
  content: string,
  exercisesSummary: ExerciseSummary[]
}

// TODO: quando PageContainer for redimensionado, alterar tamanho do editor (IEditor.layout({} as IDimension))
//       para identificar quando PageContainer for redimensionado: https://github.com/wellyshen/react-cool-dimensions
export default function Exercise({ title, breadcrumb, slug, content, exercisesSummary }: ExerciseProps) {
  const router = useRouter()
  const [user, loading, _error] = useAuthState(auth);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageContainer columns={3}>
      {router.isFallback ? (
        <>
          <Sidebar title="Exercícios" items={exercisesSummary}></Sidebar>
          <ExerciseDetails title="Carregando..." breadcrumb="" content="" />
        </>
      ) : (
        <>
          <Sidebar title="Exercícios" items={exercisesSummary}></Sidebar>
          <ExerciseDetails title={title} breadcrumb={breadcrumb} content={content} />
          {user ? (
            <ExerciseCode></ExerciseCode>
          ) : (
            loading ? (
              <h1>Carregando...</h1>
            ) : (
              <NonLoggedContentWrapper>
                <div>
                  <StyledIcon />
                </div>  
                <h3>Faça o Login acima para<br/> resolver o exercício</h3>
              </NonLoggedContentWrapper>
            )
          )}
        </>
      )}
    </PageContainer>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const exerciseDetails = getExerciseBySlug(params.slug)
  const content = await markdownToHtml(exerciseDetails.content || '')
  const exercisesSummary = getExercisesSummary()

  return {
    props: {
      title: exerciseDetails.title,
      slug: exerciseDetails.slug,
      breadcrumb: exerciseDetails.breadcrumb,
      content,
      exercisesSummary
    },
  }
}

export async function getStaticPaths() {
  const slugs = getExercisesSlugs()

  return {
    paths: slugs.map((slug) => ({params: { slug }})),
    fallback: false,
  }
}
