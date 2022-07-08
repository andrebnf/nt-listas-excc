import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import markdownToHtml from '../../lib/markdownToHtml'
import { ExerciseDetails } from '../../components/exerciseDetails'
import { ExerciseSummary, getExerciseBySlug, getExercisesSlugs, getExercisesSummary } from '../../lib/exercises'
import { PageContainer } from '../../components/page-container'
import { ExerciseCode } from '../../components/exerciseCode'
import { Sidebar } from '../../components/sidebar'
import { useUserContext } from '../../context/userAuth'

interface ExerciseProps {
  title: string,
  breadcrumb: string,
  slug: string,
  content: string,
  exercisesSummary: ExerciseSummary[]
}

export default function Exercise({ title, breadcrumb, slug, content, exercisesSummary }: ExerciseProps) {
  const router = useRouter()
  const [user, _] = useUserContext();

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
          {user.isAuthenticated ? (
            <ExerciseCode></ExerciseCode>

          ) : (
            <h1>Faça o Login acima para resolver o exercício</h1>
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
  const exerciseSlugs = getExercisesSlugs()

  return {
    paths: exerciseSlugs.map((exerciseSlug) => {
      return {
        params: {
          slug: exerciseSlug
        },
      }
    }),
    fallback: false,
  }
}
