import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth, authProvider } from "../firebase/clientApp";
import { Button2 } from './button2';
import Image from "next/image";
import { Google } from "@styled-icons/bootstrap/Google";

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

const UserNameTag = styled.p`
  display: inline;
  color: ${({theme}) => theme.colors.white};
  padding-right: ${({theme}) => theme.space[3]};
`;

export const Navigation = (props: any) => { 
  const [user, _loading, error] = useAuthState(auth);

  return (
    <NavBar>
      <Image src="/logo-white.svg" alt="Logotipo do Núcleo de Tecnologia MTST" width={40} height={40}/>
      <NavTitle>Curso Online de JavaScript</NavTitle>
      {user ? (
        <AuthAction>
          <UserNameTag>
            Olá, <b>{auth.currentUser?.displayName}</b>
          </UserNameTag>
          <Button2 variant='secondary' onClick={() => auth.signOut()}>Sair</Button2>
        </AuthAction>
      ) : (
        <AuthAction>
          <Button2 variant='secondary' onClick={
              () => {
                signInWithPopup(auth, authProvider)
                  .then()
                  .catch(
                    e => console.error("Erro ao fazer Login: ", error)
                  ); // TODO tratar erros (ex: sem conexão)
              }
            }>
            <Google/>Entrar com o Google
          </Button2>
        </AuthAction>
      )}
    </NavBar>
  )
}