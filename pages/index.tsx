import type { NextPage } from 'next';
import styled from 'styled-components';
import { Sidebar } from '../components/sidebar';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
`

const Home: NextPage = () => {
  return (
    <Sidebar></Sidebar>
  )
}

export default Home
