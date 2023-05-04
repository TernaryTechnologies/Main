import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { styled } from "@mui/system";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

const StyledSportsSoccerIcon = styled(SportsSoccerIcon)(({ theme }) => ({
  transition: "all 0.5s",
  display: "inline-block",
  transform: "translateX(-12px)",
  "&.hover": {
    animation: "bounce-spin 1s infinite",
    "@keyframes bounce-spin": {
      "0%": {
        transform: "translateX(-12px) translateY(0) rotate(0)",
      },
      "50%": {
        transform: "translateX(-12px) translateY(-8px) rotate(180deg)",
      },
      "100%": {
        transform: "translateX(-12px) translateY(0) rotate(360deg)",
      },
    },
  },
}));

const backgroundImage =
    'https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "12px",
  background: "rgba(245, 249, 255, 0.9)", // Slightly transparent
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Add a subtle shadow
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#1e5d8c",
    },
    "&:hover fieldset": {
      borderColor: "#1e5d8c",
    },
  },
  "& label.Mui-focused": {
    color: "#1e5d8c",
  },
}));

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/members/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Login response:", data);
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          token: data.access,
          refreshToken: data.refresh,
          tokenExpiration: data.expires,
        },
      });

      navigate("/");
    } else {
      // should display message that login failed, then log failure in the console.
      setShowFailedMessage(true);
      console.error("Login failed:", response.statusText);
    }
  };

  return (
    <>
    <Navbar/>
    <StyledGrid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <StyledPaper style={{ padding: "24px" }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              align="center"
              style={{
                marginBottom: "1rem",
                fontWeight: "bold",
                color: "#1e5d8c",
              }}
              onMouseEnter={(e) =>
                e.currentTarget.querySelector("svg").classList.add("hover")
              }
              onMouseLeave={(e) =>
                e.currentTarget.querySelector("svg").classList.remove("hover")
              }
            >
              <StyledSportsSoccerIcon fontSize="medium"/>
              Login
            </Typography>
            <StyledTextField
              fullWidth
              margin="normal"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <PersonOutline />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              margin="normal"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <LockOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                marginTop: "16px",
                background: "linear-gradient(90deg, #003c4a 0%, #2E73B5 100%)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              Login
            </Button>
            
            { /* conditionally render failed login message */
            showFailedMessage && 
            <Typography
              variant="b1"
              align="center"
              style={{
                marginBottom: "1rem",
                fontWeight: "bold",
                color: "#0062E6",
              }}
            >
              No matching Username/Password combination found.
            </Typography>
            }
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "16px" }}
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to="/register"
                  sx={{
                    borderColor: "#1e5d8c",
                    color: "#1e5d8c",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Grid>
    </StyledGrid>
    <AppFooter />
    </>
  );
}

export default LoginForm;
