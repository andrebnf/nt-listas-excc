export type User = {
  username?: string;
  isAuthenticated: boolean;
}

export type UserContext = [
  user: User,
  setUser: (user: User) => void
]

export type UserNavigation = {
  lastPageBeforeSignIn: string;
  getLastPageBeforeSignIn: () => string;
}

export type UserNavigationContext = {
  getLastPageBeforeSignIn: () => string;
  setLastPageBeforeSignIn: (_: string) => void;
}