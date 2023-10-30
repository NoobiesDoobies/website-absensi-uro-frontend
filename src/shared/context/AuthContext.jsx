import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  setAsAdmin: () => {},
  isAdmin: false,
  userId: null,
  setId: ()=>{}
});
