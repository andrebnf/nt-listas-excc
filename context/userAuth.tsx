import { createContext, useContext, useEffect, useState } from "react";
// import { Auth, Hub } from 'aws-amplify';
import { User, UserContext } from "../types/user";

const defaultUserValue: User = { isAuthenticated: false };

const Context = createContext<UserContext | null>(null);

export function UserAuthProvider({ children }: any) {
  const [user, setUser] = useState<User>(defaultUserValue);

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         console.log("@@@@@@@")
  //         console.log(JSON.stringify(data))
  //         setUser({...data, isAuthenticated: true});
  //         break;
  //       case "signOut":
  //         setUser(defaultUserValue);
  //         break;
  //       case "customOAuthState":
  //         console.log("@@@@@@@ ueeeeeepaaaa")

  //     }
  //   });

  //   // maybe block is not needed
  //   Auth.currentAuthenticatedUser()
  //     .then((currentUser: any) => {
  //       console.log("########")
  //       console.log(JSON.stringify(currentUser))
  //       return setUser({...currentUser, isAuthenticated: true})
  //     })
  //     .catch(() => console.log("Not signed in"));

  //   return unsubscribe;
  // }, []);

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
}

export function useUserContext(): UserContext {
  return useContext(Context) as UserContext;
}
