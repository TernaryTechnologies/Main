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

const WavyBackground = `
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320">
    <path fill="#35B0FF" fill-opacity="0.1" d="M0,64L48,69.3C96,75,192,85,288,106.7C384,128,480,160,576,181.3C672,203,768,213,864,197.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0V64Z"></path>
  </svg>
`;

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
    WavyBackground
  )}"), radial-gradient(circle at center, #0062E6 0%, #1E76BC 100%)`,
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
  background: "rgba(245, 249, 255, 0.9)", // Slightly transparent blueish white background
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Add a subtle shadow
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#0062E6",
    },
    "&:hover fieldset": {
      borderColor: "#0062E6",
    },
  },
  "& label.Mui-focused": {
    color: "#0062E6",
  },
}));

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
                color: "#0062E6",
              }}
              onMouseEnter={(e) =>
                e.currentTarget.querySelector("svg").classList.add("hover")
              }
              onMouseLeave={(e) =>
                e.currentTarget.querySelector("svg").classList.remove("hover")
              }
            >
              <StyledSportsSoccerIcon fontSize="medium" color="primary" />
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
                background: "linear-gradient(90deg, #0062E6 0%, #33AEFF 100%)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              Login
            </Button>
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
                    borderColor: "#0062E6",
                    color: "#0062E6",
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
