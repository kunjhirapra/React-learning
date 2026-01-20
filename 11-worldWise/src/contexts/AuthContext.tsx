import {createContext, useContext, useReducer, type ReactNode} from "react";
import type {AuthContextType, LoginActionType, UserInitialState} from "../type";

const initialState: UserInitialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "Jack@1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state: UserInitialState, action: LoginActionType) {
  switch (action.type) {
    case "login":
      return {...state, user: action.payload, isAuthenticated: true};
    case "logout":
      return {...state, user: null, isAuthenticated: false};
    default:
      throw new Error("Unkonwn Action type");
  }
}
const AuthContext = createContext<AuthContextType | null>(null);
function AuthContextProvider({children}: {children: ReactNode}) {
  const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      localStorage.setItem("user", JSON.stringify(FAKE_USER));
      dispatch({type: "login", payload: FAKE_USER});
      return true;
    }
    return false;
  }
  function logout() {
    dispatch({type: "logout"});
    localStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);
  if (!value)
    throw new Error(
      "Used AuthContext outside of Provider. The context can only be used in children of the Provider"
    );
  return value;
}

export {useAuth, AuthContextProvider};
