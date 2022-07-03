import type { NextPage } from 'next'
import styled from 'styled-components'

const MySection = styled.section`
  border: 2px solid red;
`;

const Home: NextPage = () => {
  return (
    <div>
      <MySection>
          ola
      </MySection>
    </div>
  )
}

export default Home
