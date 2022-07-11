import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";

import { FullWidthButton } from "./full-width-button";
import { VscPlay } from "react-icons/vsc";
import { useDebouncedCallback } from "use-debounce";

const ExerciseCodeContainer = styled.div`
  padding: ${({theme}) => theme.space[7]};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const EditorWrap = styled.div`
  border: 1px solid ${({theme}) => theme.colors.primary};
  height: 100%;
`

interface ExerciseCodeProps {
  onCodeChangeCallback: (value: string) => void,
  initialCode: string
}

export const ExerciseCode = ({ onCodeChangeCallback, initialCode }: ExerciseCodeProps) => {
  const [code, setCode] = useState(initialCode);

  const theme = useTheme();

  // Debounce significa garantir que a função seja chamada um número absurdo de vezes
  // A cada X segundos determinados abaixo, a função será executada somente 1 vez
  const debouncedEditorChange = useDebouncedCallback(
    (value) => {
      onCodeChangeCallback(value)
      setCode(value);
    },
    2000 // A cada 2 segundos depois da última alteração no código
  );

  useEffect(() => {
    console.log('Hello from useEffect!');
    
  }, []);

  return (
    <ExerciseCodeContainer>
      <EditorWrap>
        <Editor 
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={debouncedEditorChange}
          theme="light"
          options={
            {
              minimap: {enabled: false},
              wordWrap: 'on',
              padding: {top: theme.space[3], bottom: theme.space[3]},
              scrollBeyondLastLine: false,
              fontFamily: theme.fonts.code
            }
          }
     
        />
      </EditorWrap>
      <FullWidthButton onClick={() => {
        try {
          return new Function(code)() 
        } catch (error) {
          let message = 'Erro desconhecido'
          let stack
          if (error instanceof Error) {
            message = error.message
            stack = error.stack?.toString()
          } 
          alert(`Ops, tem algo de errado com seu código: ${message}\n\nStackTrace:\n${stack}`)
        }
      }}>
        <VscPlay/> Executar Código
      </FullWidthButton>
    </ExerciseCodeContainer>
  )
}