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
import { Paper } from "@mui/material";
import { PersonOutline, MailOutline, LockOutlined } from "@mui/icons-material";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import Box from "@mui/material/Box";

const backgroundImage =
  "https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
          refreshToken: data.refresh,
          tokenExpiration: data.expires,
        },
      });

      navigate("/");
    } else {
      console.error("Registration failed:", response.statusText);
    }
  };

  return (
    <>
      <Navbar />
      <StyledGrid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CenteredContainer maxWidth="sm">
          <StyledPaper>
            <Typography
              variant="h4"
              align="center"
              style={{
                marginBottom: "1rem",
                fontWeight: "bold",
                color: "#1e5d8c",
              }}
            >
              Create an Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <PersonOutline
                          sx={{ color: "action.active", mr: 1, my: -1 }}
                        />
                      ),
                    }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    InputProps={{
                      startAdornment: (
                        <PersonOutline
                          sx={{ color: "action.active", mr: 1, my: -1 }}
                        />
                      ),
                    }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <PersonOutline
                          sx={{ color: "action.active", mr: 1, my: -1 }}
                        />
                      ),
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    InputProps={{
                      startAdornment: (
                        <MailOutline
                          sx={{ color: "action.active", mr: 1, my: -1 }}
                        />
                      ),
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    autoComplete="current-password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <LockOutlined
                          sx={{ color: "action.active", mr: 1, my: -1 }}
                        />
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
                sx={{
                  mt: 3,
                  mb: 2,
                  background:
                    "linear-gradient(90deg, #003c4a 0%, #2E73B5 100%)",
                  color: "#fff",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: "#4a90e2" }}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </CenteredContainer>
      </StyledGrid>
      <AppFooter />
    </>
  );
}

export default RegisterForm;
