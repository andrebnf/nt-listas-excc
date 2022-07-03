import type { NextPage } from 'next';
import styled from 'styled-components';

const MySection = styled.section`
  border: 2px solid red;
  background-color: ${({theme}) => theme.colors.background};
`;

const Home: NextPage = () => {
  return (
    <MySection>
        ola
    </MySection>
  )
}

export default Home
