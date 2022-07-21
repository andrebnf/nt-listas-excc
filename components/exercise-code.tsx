import styled from "styled-components";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";

import { FullWidthButton } from "./full-width-button";
import { VscPlay } from "react-icons/vsc";
import { useDebouncedCallback } from "use-debounce";
import Moment from "react-moment";
import { useEffect, useState } from "react";

const ExerciseCodeContainer = styled.div`
  padding: ${({theme}) => theme.space[5]} ${({theme}) => theme.space[6]};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const EditorContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.secondary};
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
  border: 1px solid ${({theme}) => theme.colors.secondary};
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
  onAutoSaveEvent: (value: string) => void,
  onChange: (value: string) => void,
  code: string,
  slug: string,
  lastSavedAt: number | null,
  autosaveMilliseconds: number
}

export const ExerciseCode = ({ onAutoSaveEvent, onChange, code, slug, lastSavedAt, autosaveMilliseconds }: ExerciseCodeProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const theme = useTheme();

  // Debounce significa garantir que a função seja chamada um número absurdo de vezes
  // A cada X segundos determinados abaixo, a função será executada somente 1 vez
  const debouncedEditorChange = useDebouncedCallback(
    (value) => {
      onAutoSaveEvent(value);
    },
    autosaveMilliseconds // Se for igual a 2000, a cada 2 segundos depois da última alteração no código
  );

  useEffect(() => {
    setLogs([])
  }, [code])

  useEffect(() => {
    debouncedEditorChange.cancel();
  }, [slug])

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
      </EditorContainer>
      <OutputContainer>
        <OutputTitle>Saída do console:</OutputTitle>
        <OutputText>
          {logs.map((log: string) => (
            <span key={log}> {log} <br/> </span>
          ))}
        </OutputText>
      </OutputContainer>
      <FullWidthButton onClick={() => {
        try {
          const wrapCode = (code: string): string[] => {
            const prefixFnCode = "" +
              "let w___logs = []; \n" + 
              "function w___customLogFn(text){ \n" +
              "  w___logs.push(String(text)); \n" +
              "} \n";

            const parsedCode = code.replace(
              /console\.(log|info|debug|warn|error)/g, 
              "w___customLogFn"
            ) + "\n";

            const suffixFnCode = `return w___logs`;
            const finalCode = prefixFnCode + parsedCode + suffixFnCode;

            return new Function(finalCode)();
          }
          setLogs(wrapCode(code));
        } catch (error) {
          let message = 'Erro desconhecido';
          let stack;
          if (error instanceof Error) {
            message = error.message;
            stack = error.stack?.toString();
          } 
          alert(`Ops, tem algo de errado com seu código: ${message}\n\nStackTrace:\n${stack}`);
          setLogs([]);
        }
      }}>
        <VscPlay/> Executar Código
      </FullWidthButton>
    </ExerciseCodeContainer>
  )
}