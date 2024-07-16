"use client";

import { createContext, useContext, useReducer } from "react";
import { UserApi } from "../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UserAction = {
  SignUp: "SignUp",
  Login: "Login",
  Logout: "Logout",
};

const userContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case UserAction.SignUp: {
      console.log("signedup reduser", state);
      return { ...state, user: action.payload, isAuthenticated: true };
    }
    case UserAction.Login: {
      console.log("login satate and action", state, action);
      return { ...state, user: action.payload, isAuthenticated: true };
    }
    case UserAction.Logout: {
      return { ...state, user: null, isAuthenticated: false };
    }
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const SignUpFunction = async ({ username, emailId, password }) => {
    console.log("sighnupfunction");
    try {
      const response = await axios.post(`${UserApi}/register`, {
        username,
        emailId,
        password,
      });

      console.log("User Signed up ", response);
      userDispatch({ type: UserAction.SignUp, payload: response.data });
      router.push("/");
      console.log("user", user);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const LoginFunction = async ({ emailId, password }) => {
    try {
      const response = await axios.post(`${UserApi}/login`, {
        emailId,
        password,
      });
      console.log("login response", response);
      userDispatch({ type: UserAction.Login, payload: response.data });
      console.log("user", user);
      router.push("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const LogoutFunction = () => {
    userDispatch({ type: UserAction.Logout });
  };

  return (
    <userContext.Provider
      value={{ SignUpFunction, ...user, LoginFunction, LogoutFunction }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
