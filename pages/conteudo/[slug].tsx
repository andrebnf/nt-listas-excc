import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { Login as LoginIcon } from "@styled-icons/heroicons-outline/Login";

import { Conteudo, DadosArquivo, getConteudo, getConteudoBySlug, getSlugsIndividuais } from '../../lib/conteudo'
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
  conteudoArquivo: DadosArquivo
  conteudoSidebar: Conteudo,
}

export default function ConteudoPage({ conteudoArquivo }: ExerciseProps) {
  const router = useRouter()
  const [code, setCode] = useState(conteudoArquivo.codigoInicial || '');
  const [uiLoading, setUiLoading] = useState(true);
  const [docExists, setDocExists] = useState<boolean | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const [user, authLoading, _error] = useAuthState(auth);
  let userExerciseRef: DocumentReference | null = null;

  if (user && user?.uid) {
    userExerciseRef = doc(db, "user_exercises", user.uid, "exercises", conteudoArquivo.slug);
  }
  
  const createOrUpdateCode = (value: string) => {
    setCode(!!value ? value : conteudoArquivo.codigoInicial || '');
  
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
        const userExerciseRef = doc(db, "user_exercises", user.uid, "exercises", conteudoArquivo.slug);
        const docSnap = await getDoc(userExerciseRef);
        
        if (docSnap.exists()) {
          setDocExists(true);
          setCode(docSnap.data().code);
          setLastSavedAt(docSnap.data().updatedAt);
        } else {
          setDocExists(false);
          setCode(conteudoArquivo.codigoInicial || '');
          setLastSavedAt(null);
        }
      }
      
      setUiLoading(false);
    })();
  }, [conteudoArquivo, user]);

  if (!router.isFallback && !conteudoArquivo.slug) {
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
          <ContentDetails 
            title={conteudoArquivo.titulo} 
            breadcrumb={conteudoArquivo.breadcrumb} 
            content={conteudoArquivo.conteudo} 
          />
          {user ? (
            <div>
              <ExerciseCode 
                onAutoSaveEvent={createOrUpdateCode}
                onChange={(value: string) => setCode(value)} 
                code={code} 
                slug={conteudoArquivo.slug}
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
  // const contentDetails = getExerciseBySlug(params.slug)
  const conteudoArquivo: DadosArquivo = getConteudoBySlug(params.slug)
  const content = await markdownToHtml(conteudoArquivo.conteudo || '')
  const conteudoSidebar = getConteudo()

  return {
    props: {
      conteudoArquivo: {
        ...conteudoArquivo,
        conteudo: content
      },
      conteudoSidebar
    },
  }
}

export async function getStaticPaths() {
  const slugs = getSlugsIndividuais()

  return {
    paths: slugs.map((slug) => ({params: { slug }})),
    fallback: false,
  }
}
