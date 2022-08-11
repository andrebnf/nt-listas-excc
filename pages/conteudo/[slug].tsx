import { useEffect, useState } from 'react';
import Head from 'next/head';

import styled from 'styled-components';
import { Login as LoginIcon } from "@styled-icons/heroicons-outline/Login";

import { useDebouncedCallback } from "use-debounce";

import { Conteudo, DadosArquivo, getConteudo, getConteudoBySlug, getSlugsIndividuais } from '../../lib/conteudo'
import markdownToHtml from '../../lib/markdownToHtml'

import { auth, db } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

import { ContentDetails } from '../../components/content-details'
import { ContentCode } from '../../components/content-code'
import { Loading } from '../../components/loading';

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

interface ContentProps {
  conteudoArquivo: DadosArquivo
  conteudoSidebar: Conteudo
}

export default function ConteudoPage({ conteudoArquivo }: ContentProps) {
  const [user, authLoading, _error] = useAuthState(auth);

  const [code, setCode] = useState('');
  const [uiLoading, setUiLoading] = useState(true);
  const [docExists, setDocExists] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const createOrUpdateCode = async (value: string, userUid: string) => {
    const ref = doc(db, "user_exercises", userUid, "exercises", conteudoArquivo.slug);
    if (ref) {
      const now = (new Date()).valueOf();

      if (docExists) {
        await updateDoc(ref, {code: value, updatedAt: now})
      } else {
        await setDoc(ref, {code: value, updatedAt: now, createdAt: now})
      }
      setLastSavedAt(now);
    } else {
      console.log('Warning: não foi possível salvar: referencia do doc nao encontrada')
    }
  }

  const debouncedSaveCode = useDebouncedCallback((value, userUid) => {
    createOrUpdateCode(value, userUid)
  }, 1200)

  const handleEditorCodeChange = (editorCode: string, userUid: string) => {
    setCode(editorCode)
    debouncedSaveCode(editorCode, userUid)
  }

  useEffect(() => {
    const loadCodeInfoFromFirestore = async(userUid: string) => {
      const userContentRef = doc(db, "user_exercises", userUid, "exercises", conteudoArquivo.slug)
      const docSnap = await getDoc(userContentRef);
      const docExists = docSnap.exists()
  
      if (docExists) {
        setCode(docSnap.data().code)
        setLastSavedAt(docSnap.data().updatedAt);
      } else {
        setCode(conteudoArquivo.codigoInicial || '')
        setLastSavedAt(null)
      }
      setDocExists(docSnap.exists())
    }
  
    setUiLoading(true)
    user?.uid && loadCodeInfoFromFirestore(user.uid)
    setUiLoading(false)

    return () => debouncedSaveCode.cancel()
  }, [conteudoArquivo, user, debouncedSaveCode]);

  return (
    <>
      <Head>
        <title>Núcleo de Tecnologia - Curso Online</title>
      </Head>
      <ContentWrapper>
          <ContentDetails 
            title={conteudoArquivo.titulo} 
            breadcrumb={conteudoArquivo.breadcrumb} 
            content={conteudoArquivo.conteudo} 
          />
          {user ? (
            <div>
              <ContentCode 
                onCodeChange={(code) => handleEditorCodeChange(code, user.uid)} 
                code={code} 
                lastSavedAt={lastSavedAt}
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
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
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
