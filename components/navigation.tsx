import Image from 'next/image'
import styled from "styled-components";
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useUserContext } from "../context/userAuth";
import { Button } from './button';
import { BsGoogle } from "react-icons/bs";
import { StyledReactIcon } from './styledReactIcon';
import { useUserNavigationContext } from '../context/userNavigation';
import { useRouter } from 'next/router';

const NavBar = styled.nav`
  width: 100%;
  padding: 0 ${({theme}) => theme.space[4]};
  background-color: ${({theme}) => theme.colors.secondary};
  height: ${({theme}) => theme.layout.navSize};
  display: flex;
  align-items: center;
`

const NavTitle = styled.h3`
  color: white;
  padding: 0 0 0 ${({theme}) => theme.space[4]};
  margin: 0;
`

const AuthAction = styled.div`
  margin-left: auto;
`

export const Navigation = (props: any) => { 
  const [user, _setUser] = useUserContext();
  const { setLastPageBeforeSignIn } = useUserNavigationContext();
  const router = useRouter();

  return (
    <NavBar>
      <Image src="/logo-white.svg" alt="Logotipo do Núcleo de Tecnologia MTST" width={40} height={40}/>
      <NavTitle>Exercícios - Curso Online MTST {user?.username}</NavTitle>
      {user?.username ? (
        <AuthAction>
          <Button onClick={() => Auth.signOut()}>Sair</Button>
        </AuthAction>
      ) : (
        <AuthAction>
          <Button onClick={
              () => {
                setLastPageBeforeSignIn(router.asPath);
                Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google });
              }
            }>
            <StyledReactIcon><BsGoogle/></StyledReactIcon> Entrar com minha conta do Google
          </Button>
        </AuthAction>
      )}
    </NavBar>
  )
}