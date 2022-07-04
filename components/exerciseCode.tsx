import { useState } from "react";
import styled from "styled-components";
import { useTheme } from 'styled-components'
import Editor from "@monaco-editor/react";

import { FullWidthButton } from "./fullWidthButton";

const ExerciseCodeContainer = styled.div`
  padding: ${({theme}) => theme.space[4]};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const EditorWrap = styled.div`
  border: 1px solid ${({theme}) => theme.colors.primary};
  height: 100%;
`


export const ExerciseCode = (props: any) => {
  const [code, setCode] = useState(
    `// Exemplo de código para testar o editor\n// Problemas conhecidos: overflow vertical não tá funcionando e desloca a página toda\n\nmeu_array = [1, 2, 3, 'a']\narray_de_numeros = []\narray_de_strings = []\n\nfor (let i = 0; i < meu_array.length; i++){\n  elemento = meu_array[i]\n  if (typeof elemento === 'number') {\n    array_de_numeros.push(elemento)\n  } else if (typeof elemento === 'string') {\n    array_de_strings.push(elemento)\n  } else {\n    alert('Pulando elemento: ' + elemento + '. Motivo: tipo não encontrado')\n  }\n}\n\nalert('Arrays de numero e string respectivamente:')\nalert(array_de_numeros)\nalert(array_de_strings)`
  );

  const theme = useTheme();

  return (
    <ExerciseCodeContainer>
      <EditorWrap>
        <Editor 
          defaultLanguage="javascript"
          defaultValue={code}
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
      <FullWidthButton />
    </ExerciseCodeContainer>
  )
}