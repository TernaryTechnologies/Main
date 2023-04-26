import React, { useReducer, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom"
import HomePage from "./HomePage";
import CreateEventPage from "./CreateEventPage";
import TermsPage from "./TermsPage";
import LoginForm from "./LoginForm";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RegisterForm from "./RegisterForm";
import GoogleMapsWrapper from "./GoogleMapsWrapper";

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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
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
              <Route exact path="/terms" element={<TermsPage />} />
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
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: { user, token },
      });
    }
  }, []);

  return <MainApp state={state} dispatch={dispatch} />;
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

