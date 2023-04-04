import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography, InputAdornment, IconButton  } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
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
  background: "rgba(255, 255, 255, 0.4)", // Semi-transparent white background
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
        },
      });

      navigate("/");
    } else {
      console.error("Login failed:", response.statusText);
    }
  };

  return (
    <StyledGrid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <StyledPaper style={{ padding: "24px" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="center" style={{ marginBottom: "1rem", fontWeight: "bold", color: "#0070f3" }}>
              Login
            </Typography>
            <TextField
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
            <TextField
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
              style={{ marginTop: "16px" }}
            >
              Login
            </Button>
            <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  component={Link}
                  to="/register"
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Grid>
    </StyledGrid>
  );
}

export default LoginForm;

