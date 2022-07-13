import styled from "styled-components";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";

import { FullWidthButton } from "./full-width-button";
import { VscPlay } from "react-icons/vsc";
import { useDebouncedCallback } from "use-debounce";
import Moment from "react-moment";
import { useState } from "react";

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

const SavedAtInfo = styled.p`
  text-align: right;
  font-size: ${({theme}) => theme.fontSize.medium};
  margin: 0;
  min-height: ${({theme}) => theme.space[4]};
`

const OutputContainer = styled.div`
  border: 1px solid red;
`

const OutputText = styled.p`
  margin: 0;
  font-family: ${({theme}) => theme.fonts.code};
`

interface ExerciseCodeProps {
  onAutoSaveEvent: (value: string) => void,
  onChange: (value: string) => void,
  code: string,
  lastSavedAt: number | null,
  autosaveMilliseconds: number
}

export const ExerciseCode = ({ onAutoSaveEvent, onChange, code, lastSavedAt, autosaveMilliseconds }: ExerciseCodeProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const theme = useTheme();

  // Debounce significa garantir que a função seja chamada um número absurdo de vezes
  // A cada X segundos determinados abaixo, a função será executada somente 1 vez
  const debouncedEditorChange = useDebouncedCallback(
    (value) => {
      onAutoSaveEvent(value)
    },
    autosaveMilliseconds // Se for igual a 2000, a cada 2 segundos depois da última alteração no código
  );

  return (
    <ExerciseCodeContainer>
      <SavedAtInfo>
        {lastSavedAt && (
          <>
            Código salvo pela última vez: <Moment fromNow>{lastSavedAt}</Moment>
          </>
        )}
      </SavedAtInfo>
      <EditorWrap>
        <Editor 
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => {
            debouncedEditorChange(value);
            onChange(value || '');
          }}
          theme="light"
          options={
            {
              minimap: {enabled: false},
              wordWrap: 'on',
              padding: {top: theme.space[3], bottom: theme.space[3]},
              scrollBeyondLastLine: false,
              fontFamily: theme.fonts.code,
              tabSize: 2
            }
          }
     
        />
      </EditorWrap>
      <OutputContainer>
        <OutputText>
          {logs.join('\n')}
        </OutputText>
      </OutputContainer>
      <FullWidthButton onClick={() => {
        try {
          const wrapCode = (code: string): string[] => {
            const oldConsole = window.console;
            let logs: string[] = []
            let logFn = function(value: any) { 
                logs.push(value)
            }

            // console.log = logFn;
            // console.info = (value: string) => logFn(`INFO: ${value}`)
            // console.debug = (value: string) => logFn(`DEBUG: ${value}`)
            // console.warn = (value: string) => logFn(`WARN: ${value}`)
            // console.error = (value: string) => logFn(`ERROR: ${value}`)
            
            new Function(code)();

            // window.console = oldConsole

            return logs;
          }
          setLogs(wrapCode(code));
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