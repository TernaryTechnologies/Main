import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { PersonOutline, MailOutline, LockOutlined } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.8)",
}));

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/members/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration response:", data);

      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          token: data.access,
        },
      });

      navigate("/");
    } else {
      console.error("Registration failed:", response.statusText);
    }
  };

  return (
    <CenteredContainer maxWidth="xs">
      <StyledPaper>
        <Typography variant="h4" style={{ marginBottom: "1rem", fontWeight: "bold", color: "#0070f3" }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <PersonOutline sx={{ color: "action.active", mr: 1, my: -1 }} />
                  ),
                }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                InputProps={{
                  startAdornment: (
                    <PersonOutline sx={{ color: "action.active", mr: 1, my: -1 }} />
                  ),
                }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                InputProps={{
                  startAdornment: (
                    <PersonOutline sx={{ color: "action.active", mr: 1, my: -1 }} />
                  ),
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <MailOutline sx={{ color: "action.active", mr: 1, my: -1 }} />
                  ),
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <LockOutlined sx={{ color: "action.active", mr: 1, my: -1 }} />
                  ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#0070f3", color: "#fff" }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" sx={{ color: "#0070f3" }}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </CenteredContainer>
  );  
}

export default RegisterForm; 