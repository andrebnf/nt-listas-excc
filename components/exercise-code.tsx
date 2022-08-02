import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";
import { Play } from "@styled-icons/feather/Play";
import { useDebouncedCallback } from "use-debounce";
import Moment from "react-moment";

import { FullWidthButton } from "./full-width-button";

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
              wordBasedSuggestions: false,
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
        // try {
          const wrapCode = (code: string): string[] => {
            const prefixFnCode = "let w___logs = []; let w___errorLine = 0; let w___errorMessage = ''; function w___customLogFn(text){ w___logs.push(String(text)); }" + 
              "try{ \n";

            const parsedCode = code.replace(
              /console\.(log|info|debug|warn|error)/g, 
              "w___customLogFn"
            ) + "\n";

            const suffixFnCode = `\n } catch(err) { w___errorMessage = err.message; w___errorLine = +err.stack.split("\\n").filter(e => e.includes("<anonymous>") || e.includes("Function"))[0].replace(/.*\\:(\\d+)\\:.*/, "$1"); } \n finally { \n return [ w___logs, w___errorLine > 0, w___errorLine - 3, w___errorMessage ]; }`;
            const finalCode = prefixFnCode + parsedCode + suffixFnCode;

            return new Function(finalCode)();
          }
        try {
          let [logs, hasError, errorLine, errorMessage] = wrapCode(code) as [string[], string, number, string]
          setLogs(logs);

          if (hasError) {
            alert(`Ops, tem algo de errado com seu código na linha ${errorLine}: ${errorMessage}`)
          }
        } catch (err) {
          alert(`O código contém erros de sintaxe: "${(err as Error).stack?.split("\n")[0]}". 💡 Dica: utilize as marcações em vermelho no editor para encontrar o problema.`)
        }
      }}>
        <Play size={theme.iconSize.medium}/> Executar Código
      </FullWidthButton>
    </ExerciseCodeContainer>
  )
}