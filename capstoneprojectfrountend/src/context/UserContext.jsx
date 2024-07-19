"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { UserApi } from "../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UserAction = {
  SignUp: "SignUp",
  Login: "Login",
  Logout: "Logout",
};

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

if (typeof window !== "undefined") {
  initialState.token = localStorage.getItem("token");
  initialState.user = JSON.parse(localStorage.getItem("user"));
  initialState.isAuthenticated = !!initialState.user;
}

function reducer(state, action) {
  console.log("reducer top state", state);
  console.log("reducer top action", action);
  switch (action.type) {
    case UserAction.SignUp: {
      console.log("signedup reduser", state);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    case UserAction.Login: {
      console.log("login satate", state);
      console.log("login action", action);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    case UserAction.Logout: {
      return { ...state, user: null, isAuthenticated: false, token: null };
    }
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${UserApi}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log("response data", response);
          const user = response.data;
          console.log("get me user", user);
          userDispatch({
            type: UserAction.Login,
            payload: { user, token },
          });
        })
        .catch(() => {
          console.log("usernot got", user);
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, []);

  const SignUpFunction = async ({ username, emailId, password }) => {
    console.log("sighnupfunction");
    try {
      const response = await axios.post(`${UserApi}/register`, {
        username,
        emailId,
        password,
      });

      console.log("User Signed up ", response);

      router.push("/login");
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
      console.log("response", response);
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("login response", response);
      userDispatch({ type: UserAction.Login, payload: { user, token } });
      console.log("user", user);
      router.push("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const LogoutFunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    userDispatch({ type: UserAction.Logout });
    router.push("/login");
  };

  return (
    <UserContext.Provider
      value={{ SignUpFunction, userState, LoginFunction, LogoutFunction }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
