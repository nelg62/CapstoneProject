"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserApi } from "../../utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleAlert from "@/components/Alert";

export const UserAction = {
  SignUp: "SignUp",
  Login: "Login",
  Logout: "Logout",
};

const UserContext = createContext();

const initialState = {
  id: null,
  username: null,
  emailId: null,
  isAuthenticated: false,
  token: null,
};

if (typeof window !== "undefined") {
  // console.log('typeof window !== "undefined"');
  initialState.token = localStorage.getItem("token");
  initialState.user = JSON.parse(localStorage.getItem("user"));
  initialState.isAuthenticated = !!initialState.user;
}

function reducer(state, action) {
  // console.log("reducer");
  // console.log("reducer top state", state);
  // console.log("reducer top action", action);
  switch (action.type) {
    case UserAction.SignUp: {
      // console.log("signedup reduser", state);
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        emailId: action.payload.user.emailId,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    case UserAction.Login: {
      // console.log("login satate", state);
      // console.log("login action", action);
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        emailId: action.payload.user.emailId,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    case UserAction.Logout: {
      return {
        ...state,
        id: null,
        username: null,
        emailId: null,
        isAuthenticated: false,
        token: null,
      };
    }
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  // console.log("UserProvider");
  const [userState, userDispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // console.log("userProvider userState", userState);

  useEffect(() => {
    // console.log("UserProvider userEffect");
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${UserApi}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          // console.log("response data", response);
          const user = response.data;
          // console.log("get me user", user);
          userDispatch({
            type: UserAction.Login,
            payload: { user, token },
          });
        })
        .catch(() => {
          // console.log("usernot got", user);
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, []);

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const SignUpFunction = async ({ username, emailId, password }) => {
    // console.log("sighnupfunction");
    try {
      const response = await axios.post(`${UserApi}/register`, {
        username,
        emailId,
        password,
      });

      console.log("User Signed up ", response);
      setAlert({
        open: true,
        message: "User Signed up successfully",
        severity: "success",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error adding user", error);
      setAlert({
        open: true,
        message: "User Signed up failed",
        severity: "error",
      });
    }
  };

  const LoginFunction = async ({ emailId, password }) => {
    // console.log("loginFunction");
    try {
      const response = await axios.post(`${UserApi}/login`, {
        emailId,
        password,
      });
      // console.log("response", response);
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // console.log("login response", response);
      userDispatch({ type: UserAction.Login, payload: { user, token } });
      // console.log("user", user);
      router.push("/dashboard");
      setAlert({
        open: true,
        message: "User Logged in successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error logging in", error);
      setAlert({
        open: true,
        message: "User Login in failed",
        severity: "error",
      });
    }
  };

  const LogoutFunction = () => {
    // console.log("logoutfdunction");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    userDispatch({ type: UserAction.Logout });
    router.push("/login");
    setAlert({
      open: true,
      message: "User Loggedout",
      severity: "success",
    });
  };

  return (
    <UserContext.Provider
      value={{
        SignUpFunction,
        userState,
        LoginFunction,
        LogoutFunction,
        setAlert,
        alert,
      }}
    >
      {children}
      {alert.open && (
        <SimpleAlert
          message={alert.message}
          severity={alert.severity}
          onClose={closeAlert}
        />
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
