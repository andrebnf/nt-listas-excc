import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { PageContainer } from '../components/page-container';
import { useUserNavigationContext } from '../context/userNavigation';

const AuthRedirect: NextPage = (_props: any) => {
  const { getLastPageBeforeSignIn } = useUserNavigationContext();
  const router = useRouter();

  // useEffect(() => {
  //   const redirectTo = getLastPageBeforeSignIn();
  //   router.push(redirectTo);
  // }, []);

  return (
    <PageContainer columns={1}>
      <h1>Redirecionando...</h1>
    </PageContainer>
  )
}

export default AuthRedirect;
