import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import styled from "styled-components";

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
  }

  textarea:focus {
    outline-color: ${({theme}) => theme.colors.primary};
    outline-offset: -1px;
  }
`

export const ExerciseCode = (props: any) => {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <ExerciseCodeContainer>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js, 'javascript')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 24
        }}
        textareaClassName="exercise-code-editor"
      />
      <FullWidthButton />
    </ExerciseCodeContainer>
  )
}