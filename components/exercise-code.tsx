import styled from "styled-components";
import { useState } from "react";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";
import { Play } from "@styled-icons/feather/Play";
import Moment from "react-moment";

import { FullWidthButton } from "./full-width-button";
import { executaJavaScript } from "../lib/executorDeCodigo";

const ExerciseCodeContainer = styled.div`
  padding: ${({theme}) => theme.space[4]} ${({theme}) => theme.space[4]};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-height: ${({theme}) => theme.layout.contentSize};
`

const EditorContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.editorBorder};
  height: 65%;
`

const SavedAtInfo = styled.p`
  text-align: right;
  font-size: ${({theme}) => theme.fontSize.medium};
  margin: 0;
  min-height: ${({theme}) => theme.space[4]};
`

const OutputContainer = styled.div`
  padding: ${({theme}) => theme.space[1]};
  border: 1px solid ${({theme}) => theme.colors.editorBorder};
  border-top: 0px;
  border-bottom: 0px;
  height: 35%;
  overflow: auto;
`

const OutputText = styled.p`
  margin: 0;
  font-size: ${({theme}) => theme.fontSize.medium};
  font-family: ${({theme}) => theme.fonts.code};
`

const OutputTitle = styled.p`
  margin: 0;
  margin-bottom: ${({theme}) => theme.space[1]};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: bold;
`

interface ExerciseCodeProps {
  onCodeChange: (value: string) => void,
  code: string,
  lastSavedAt: number | null
}

export const ExerciseCode = ({onCodeChange, code, lastSavedAt}: ExerciseCodeProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const theme = useTheme();

  const executarCodigoClick = () => {
    try {
      let [logs, hasError, errorLine, errorMessage] = executaJavaScript(code)
      setLogs(logs);

      if (hasError) {
        alert(`🚫 Erro na linha ${errorLine}: ${errorMessage}`)
      }
    } catch (err) {
      alert(`🚫 O código contém erros de sintaxe: "${(err as Error).stack?.split("\n")[0]}". 💡 Dica: utilize as marcações em vermelho no editor para encontrar o problema.`)
    }
  }

  return (
    <ExerciseCodeContainer>
      <SavedAtInfo>
        {lastSavedAt && (
          <>
            Código salvo: <Moment fromNow>{lastSavedAt}</Moment>
          </>
        )}
      </SavedAtInfo>
      <EditorContainer>
        <Editor 
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => onCodeChange(value as string)}
          theme="light"
          options={
            {
              minimap: {enabled: false},
              automaticLayout: true,
              padding: {top: theme.space[3], bottom: theme.space[3]},
              scrollBeyondLastLine: false,
              fontFamily: theme.fonts.codeEditor,
              fontSize: 16,
              tabSize: 2,
              quickSuggestions: {
                other: false,
                comments: false,
                strings: false
              },
              parameterHints: {
                enabled: false
              },
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
              tabCompletion: "off",
              wordBasedSuggestions: false
            }
          }
     
        />
      </EditorContainer>
      <OutputContainer>
        <OutputTitle>Saída do console:</OutputTitle>
        <OutputText>
          {logs.map((log: string) => (
            <span key={log}> {log} <br/> </span>
          ))}
        </OutputText>
      </OutputContainer>
      <FullWidthButton onClick={executarCodigoClick}>
        <Play size={theme.iconSize.medium}/> Executar Código
      </FullWidthButton>
    </ExerciseCodeContainer>
  )
}
