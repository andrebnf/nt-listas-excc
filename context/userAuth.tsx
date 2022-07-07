import { createContext, useContext, useEffect, useState } from "react";
import { Auth, Hub } from 'aws-amplify';

const Context = createContext<any>({});

export function UserAuthProvider({ children }: any) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser({});
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser: any) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
