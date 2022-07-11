import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useAuthState } from "react-firebase-hooks/auth";
import { TbFileCode2 } from 'react-icons/tb';
import styled from 'styled-components';

import { auth, db } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore"; 

import { ExerciseSummary, getExerciseBySlug, getExercisesSlugs, getExercisesSummary } from '../../lib/exercises'
import markdownToHtml from '../../lib/markdownToHtml'

import { ExerciseDetails } from '../../components/exercise-details'
import { PageContainer } from '../../components/page-container'
import { ExerciseCode } from '../../components/exercise-code'
import { Sidebar } from '../../components/sidebar'
import { useEffect } from 'react';

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

  const onCodeChangeCallback = (value: string) => {
    console.log("SALVA PORRR")
    console.log(value)
  }

  useEffect(() => {
    (async() => {
      if (user && user?.uid) {
        const userExerciseRef = doc(db, "user_exercises", user.uid, "exercises", slug);
        console.log(JSON.stringify(userExerciseRef))
        const docSnap = await getDoc(userExerciseRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    })();
  }, [slug]);

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
            <ExerciseCode onCodeChangeCallback={onCodeChangeCallback} initialCode=""></ExerciseCode>
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
  // Lendo arquivos dos exercícios
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
