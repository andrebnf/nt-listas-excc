import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { Login as LoginIcon } from "@styled-icons/heroicons-outline/Login";

import { ContentSummary, getExerciseBySlug, getExercisesSlugs, getExercisesSummary } from '../../lib/exercises'
import markdownToHtml from '../../lib/markdownToHtml'

import { auth, db } from "../../firebase/clientApp";
import { doc, DocumentReference, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

import { ContentDetails } from '../../components/exercise-details'
import { ExerciseCode } from '../../components/exercise-code'
import { Loading } from '../../components/loading';
import Head from 'next/head';

const NonLoggedContentFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  svg {
    width: ${({theme}) => theme.iconSize.xlarge}
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 44% 56%;
`

interface ExerciseProps {
  title: string,
  breadcrumb: string,
  slug: string,
  content: string,
  exercisesSummary: ContentSummary[],
  startingEditorCode?: string
}

// TODO: quando PageContainer for redimensionado, alterar tamanho do editor (IEditor.layout({} as IDimension))
//       para identificar quando PageContainer for redimensionado: https://github.com/wellyshen/react-cool-dimensions
export default function Exercise({ title, breadcrumb, slug, content, exercisesSummary, startingEditorCode = '' }: ExerciseProps) {
  const router = useRouter()
  const [code, setCode] = useState(startingEditorCode);
  const [uiLoading, setUiLoading] = useState(true);
  const [docExists, setDocExists] = useState<boolean | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const [user, authLoading, _error] = useAuthState(auth);
  let userExerciseRef: DocumentReference | null = null;

  if (user && user?.uid) {
    userExerciseRef = doc(db, "user_exercises", user.uid, "exercises", slug);
  }
  
  const createOrUpdateCode = (value: string) => {
    setCode(!!value ? value : startingEditorCode);
  
    return (async() => {
      if (userExerciseRef) {
        const now = (new Date()).valueOf();

        if (docExists) {
          await updateDoc(userExerciseRef, {
            code: value,
            updatedAt: now
          })
        } else {
          await setDoc(userExerciseRef, {
            code: value,
            updatedAt: now,
            createdAt: now
          })
        }
        setLastSavedAt(now);
      } else {
        console.log('Warning: não foi possível salvar: referencia do doc nao encontrada')
      }
    })()
  }

  useEffect(() => {
    // Recupera informações do exercício caso a pessoa já tenha começado
    // ou cria um novo documento daquele exercício para aquele user
    (async() => {
      setUiLoading(true);
      if (user && user?.uid) {
        const userExerciseRef = doc(db, "user_exercises", user.uid, "exercises", slug);
        const docSnap = await getDoc(userExerciseRef);
        
        if (docSnap.exists()) {
          setDocExists(true);
          setCode(docSnap.data().code);
          setLastSavedAt(docSnap.data().updatedAt);
        } else {
          setDocExists(false);
          setCode(startingEditorCode);
          setLastSavedAt(null);
        }
      }
      
      setUiLoading(false);
    })();
  }, [slug, user, startingEditorCode]);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Núcleo de Tecnologia - Curso Online</title>
      </Head>
      {router.isFallback ? (
        <>
          <Loading size="xxlarge"></Loading>
        </>
      ) : (
        <ContentWrapper>
          <ContentDetails title={title} breadcrumb={breadcrumb} content={content} />
          {user ? (
            <div>
              <ExerciseCode 
                onAutoSaveEvent={createOrUpdateCode}
                onChange={(value: string) => setCode(value)} 
                code={code} 
                slug={slug}
                lastSavedAt={lastSavedAt}
                autosaveMilliseconds={2000}
              />
            </div>
          ) : (
            authLoading || uiLoading ? (
              <Loading size="xxlarge"></Loading>
            ) : (
              <NonLoggedContentFlexWrapper>
                <div><LoginIcon /></div>  
                <h3>Faça o Login utilizando o botão acima<br/> para abrir o editor de código</h3>
              </NonLoggedContentFlexWrapper>
            )
          )}
        </ContentWrapper>
      )}
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // Lendo arquivos dos exercícios
  const ContentDetails = getExerciseBySlug(params.slug)
  const content = await markdownToHtml(ContentDetails.content || '')
  const exercisesSummary = getExercisesSummary()

  return {
    props: {
      title: ContentDetails.title,
      slug: ContentDetails.slug,
      breadcrumb: ContentDetails.breadcrumb,
      startingEditorCode: ContentDetails.startingEditorCode || null,
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
