import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { ImGoogle2 } from 'react-icons/im';
import styled from "styled-components";
import { auth, authProvider } from "../firebase/clientApp";
import { Button } from './button';
import Image from "next/image";
import { StyledReactIcon } from './styled-react-icon';

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
  const [user, _loading, error] = useAuthState(auth);

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
                signInWithPopup(auth, authProvider).then().catch(e => console.error("Erro ao fazer Login: ", error)); // TODO tratar erros (ex: sem conexão)
              }
            }>
            <StyledReactIcon><ImGoogle2/></StyledReactIcon>&nbsp;&nbsp;Entrar com o Google
          </Button>
        </AuthAction>
      )}
    </NavBar>
  )
}