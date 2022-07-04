import { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

import { ExerciseDetails } from '../components/exerciseDetails';
import { ExerciseCode } from '../components/exerciseCode';
import { Sidebar } from '../components/sidebar';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;

  height: ${({theme}) => theme.layout.contentSize};
`

const Home: NextPage = () => {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <PageContainer>
      <Sidebar></Sidebar>
      <ExerciseDetails></ExerciseDetails>
      <div>
          <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js, 'javascript')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 24,
          }}
        />
      </div>
    </PageContainer>
  )
}

export default Home
