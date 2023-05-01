import React, { useReducer, useEffect } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HomePage from "./HomePage";
import CreateEventPage from "./CreateEventPage";
import LoginForm from "./LoginForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RegisterForm from "./RegisterForm";
import GoogleMapsWrapper from "./GoogleMapsWrapper";
import { refreshToken } from './tokenUtils';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refreshToken)
      );
      localStorage.setItem(
        "tokenExpiration",
        JSON.stringify(action.payload.tokenExpiration)
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

function MainApp({ state, dispatch }) {
  return (
    <GoogleMapsWrapper>
      <AuthContext.Provider value={{ state, dispatch }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/create" element={<CreateEventPage />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/register" element={<RegisterForm />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </AuthContext.Provider>
    </GoogleMapsWrapper>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const tokenExpiration = JSON.parse(localStorage.getItem("tokenExpiration"));
  
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: { user, token, refreshToken, tokenExpiration },
      });
    }
  }, []);  

  useEffect(() => {
    if (state.isAuthenticated) {
      const checkTokenExpiration = async () => {
        const tokenExpiration = JSON.parse(
          localStorage.getItem("tokenExpiration")
        );
        const storedRefreshToken = JSON.parse(localStorage.getItem("refreshToken"));

        if (new Date(tokenExpiration) <= new Date()) {
          try {
            const newToken = await refreshToken(storedRefreshToken);
            dispatch({
              type: "REFRESH_TOKEN",
              payload: { token: newToken },
            });
          } catch (error) {
            console.error("Failed to refresh token:", error);
            dispatch({ type: "LOGOUT" });
          }
        }
      };

      checkTokenExpiration();
    }
  }, [state.isAuthenticated]);

  return <MainApp state={state} dispatch={dispatch} />;
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
