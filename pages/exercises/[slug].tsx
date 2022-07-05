import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import markdownToHtml from '../../lib/markdownToHtml'
import { ExerciseDetails } from '../../components/exerciseDetails'
import { getExerciseBySlug, getExercisesSlugs } from '../../lib/exercises'
import { PageContainer } from '../../components/page-container'
import { ExerciseCode } from '../../components/exerciseCode'
import { Sidebar } from '../../components/sidebar'

interface ExerciseProps {
  title: string,
  breadcrumb: string,
  slug: string,
  content: string
}

export default function Exercise({ title, breadcrumb, slug, content }: ExerciseProps) {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <PageContainer columns={3}>
      {router.isFallback ? (
        <>
          <Sidebar title="Exercícios" items={[]}></Sidebar>
          <ExerciseDetails title="Carregando..." breadcrumb="" content="" />
        </>
      ) : (
        <>
          <Sidebar title="Exercícios" items={[]}></Sidebar>
          <ExerciseDetails title={title} breadcrumb={breadcrumb} content={content} />
          <ExerciseCode></ExerciseCode>
        </>
      )}
    </PageContainer>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const exerciseDetails = getExerciseBySlug(params.slug)
  const content = await markdownToHtml(exerciseDetails.content || '')

  return {
    props: {
      title: exerciseDetails.title,
      slug: exerciseDetails.slug,
      breadcrumb: exerciseDetails.breadcrumb,
      content
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
