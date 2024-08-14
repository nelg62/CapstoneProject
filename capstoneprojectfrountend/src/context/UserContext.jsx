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

// Define user actions
export const UserAction = {
  SignUp: "SignUp",
  Login: "Login",
  Logout: "Logout",
};

// Create UserContext
const UserContext = createContext();

// Initial state for the user
const initialState = {
  id: null,
  username: null,
  emailId: null,
  isAuthenticated: false,
  token: null,
};

// Reducer function to handle user actions
function reducer(state, action) {
  switch (action.type) {
    // Signup action
    case UserAction.SignUp: {
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        emailId: action.payload.user.emailId,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    // Login action
    case UserAction.Login: {
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        emailId: action.payload.user.emailId,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }
    // Logout action
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

// UserProvider component to provide userState and actions
export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isload, setIsload] = useState(false);

  // Check for token in local storage abd fetch user data if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsload(false);
      axios
        .get(`${UserApi}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const user = response.data;
          console.log("loccal store", user);
          userDispatch({
            type: UserAction.Login,
            payload: { user, token },
          });
          setIsload(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    } else {
      setIsload(true);
    }
  }, []);

  // Function to close alert
  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  // Function to handle user Signup
  const SignUpFunction = async ({ username, emailId, password }) => {
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
      console.error(
        "Error adding user",
        error.response ? error.response.data : error.message
      );
      setAlert({
        open: true,
        message: "User Signed up failed",
        severity: "error",
      });
    }
  };

  // Function to handle user Login
  const LoginFunction = async ({ emailId, password }) => {
    try {
      const response = await axios.post(
        `${UserApi}/login`,
        {
          emailId,
          password,
        },
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      userDispatch({ type: UserAction.Login, payload: { user, token } });

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

  // Function to handle user Logout
  const LogoutFunction = () => {
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
      {isload && (
        <>
          {children}
          {alert.open && (
            <SimpleAlert
              message={alert.message}
              severity={alert.severity}
              onClose={closeAlert}
            />
          )}
        </>
      )}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
