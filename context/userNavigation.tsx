import { createContext, useContext, useEffect, useState } from "react";
import { UserNavigation, UserNavigationContext } from "../types/user";

const getLastPageBeforeSignIn = () => (
  localStorage.getItem("userNavigation") || "/"
);

const defaultUserNavigationContext: UserNavigationContext = {
  setLastPageBeforeSignIn: () => {},
  getLastPageBeforeSignIn: () => ""
}

const Context = createContext<UserNavigationContext>(defaultUserNavigationContext)

export function UserNavigationProvider({ children }: any) {
  // Maybe not needed
  // const contextValue = useMemo<UserNavigationContext>(() => {
  //     return [userNavigation, setUserNavigation];
  // }, [userNavigation, setUserNavigation]);

  const value: UserNavigationContext = {
    setLastPageBeforeSignIn: (lastPage: string) => 
      localStorage.setItem("lastPageBeforeSignIn", lastPage),
    getLastPageBeforeSignIn: () =>
      localStorage.getItem("lastPageBeforeSignIn") || "/"
  }

  // useEffect(() => {
  //   console.log("========")
  //   console.log("Updated user navigattion: " + JSON.stringify(userNavigation))
  //   localStorage.setItem("userNavigation", JSON.stringify(userNavigation)); 
  // }, [userNavigation]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export function useUserNavigationContext(): UserNavigationContext {
  return useContext(Context) as UserNavigationContext;
}