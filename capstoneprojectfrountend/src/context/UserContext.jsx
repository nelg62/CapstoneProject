"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { UserApi } from "../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const UserAction = {
  SignUp: "SignUp",
  Login: "Login",
  Logout: "Logout",
};

const UserContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
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
  const [user, userDispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get(`${UserApi}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const { user } = response.data;
          userDispatch({
            type: UserAction.Login,
            payload: { user, token },
          }).catch(() => {
            Cookies.remove("token");
            router.push("/login");
          });
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
      const { token, ...user } = response.data;
      Cookies.set("token", token);

      console.log("User Signed up ", response);
      userDispatch({ type: UserAction.SignUp, payload: { user, token } });
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
      console.log("response", response);
      const { user, token } = response.data;
      Cookies.set("token", token);
      console.log("login response", response);
      userDispatch({ type: UserAction.Login, payload: { user, token } });
      console.log("user", user);
      router.push("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const LogoutFunction = () => {
    Cookies.remove("token");
    userDispatch({ type: UserAction.Logout });
    router.push("/login");
  };

  return (
    <UserContext.Provider
      value={{ SignUpFunction, user, LoginFunction, LogoutFunction }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
