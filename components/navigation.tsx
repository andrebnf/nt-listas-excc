import { useUserContext } from "../context/userAuth";
import { Button } from './button';
import { StyledReactIcon } from './styledReactIcon';
import { useUserNavigationContext } from '../context/userNavigation';
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { BsGoogle } from 'react-icons/bs';
import { auth, authProvider } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";

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
  // const [user, _setUser] = useUserContext();
  const { setLastPageBeforeSignIn } = useUserNavigationContext();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  return (
    <NavBar>
      <Image src="/logo-white.svg" alt="Logotipo do Núcleo de Tecnologia MTST" width={40} height={40}/>
      <NavTitle>Exercícios - Curso Online MTST</NavTitle>
      {user ? (
        <AuthAction>
          <Button onClick={() => auth.signOut()}>Sair</Button>
        </AuthAction>
      ) : (
        <AuthAction>
          <Button onClick={
              () => {
                setLastPageBeforeSignIn(router.asPath);
                signInWithPopup(auth, authProvider).then(function(result) {
                  console.log(result)
                 });
                 
              }
            }>
            <StyledReactIcon><BsGoogle/></StyledReactIcon> Entrar com minha conta do Google
          </Button>
        </AuthAction>
      )}
    </NavBar>
  )
}