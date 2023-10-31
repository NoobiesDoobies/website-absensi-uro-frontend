import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  userId: null,
  token: null,
});
