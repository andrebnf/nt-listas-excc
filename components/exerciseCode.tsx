import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import styled from "styled-components";
import { useTheme } from 'styled-components'

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { FullWidthButton } from "./fullWidthButton";

const ExerciseCodeContainer = styled.div`
  padding: ${({theme}) => theme.space[4]};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & div:first-child {
    height: 100%;
  }

  textarea {
    outline: auto;
    outline-color: #ccc;
    white-space: pre !important;
  }

  textarea:focus {
    outline-color: ${({theme}) => theme.colors.primary};
    outline-offset: -1px;
  }
`

const EditorWrap = styled.div`
  overflow: auto;
`

const StyledEditor = styled(Editor)`
  white-space: pre;
`;

export const ExerciseCode = (props: any) => {
  const [code, setCode] = useState(
    `// Exemplo de código para testar o editor\n// Problemas conhecidos: overflow vertical não tá funcionando e desloca a página toda\n\nmeu_array = [1, 2, 3, 'a']\narray_de_numeros = []\narray_de_strings = []\n\nfor (let i = 0; i < meu_array.length; i++){\n  elemento = meu_array[i]\n  if (typeof elemento === 'number') {\n    array_de_numeros.push(elemento)\n  } else if (typeof elemento === 'string') {\n    array_de_strings.push(elemento)\n  } else {\n    alert('Pulando elemento: ' + elemento + '. Motivo: tipo não encontrado')\n  }\n}\n\nalert('Arrays de numero e string respectivamente:')\nalert(array_de_numeros)\nalert(array_de_strings)`
  );

  const theme = useTheme();

  return (
    <ExerciseCodeContainer>
      <EditorWrap>
        <StyledEditor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js, 'javascript')}
          padding={10}
          style={{
            fontFamily: theme.fonts.code,
            lineHeight: theme.fontSize.xlarge,
            fontSize: theme.fontSize.medium
          }}
        />
      </EditorWrap>
      <FullWidthButton />
    </ExerciseCodeContainer>
  )
}