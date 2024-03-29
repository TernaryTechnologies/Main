import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Checkbox,
  Button,
  Grid,
  Paper,
  Container,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import AppFooter from "./AppFooter";
import Navbar from "./Navbar";
import { styled } from "@mui/system";

function roundToDecimalPlaces(value, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

const backgroundImage =
  "https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "12px",
  background: "rgba(245, 249, 255, 0.8)", // Slightly transparent
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Add a subtle shadow
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    sport: "",
    date: format(new Date(), "yyyy/MM/dd"),
    time: "10:00",
    latitude: 34.057919,
    longitude: -117.821342,
    beginner_friendly: false,
    women_only: false,
    zoom: 12,
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prevState) => ({
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          console.log("Error getting location: ", errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleSportChange = (e) => {
    setState((prevState) => ({ ...prevState, sport: e.target.value }));
  };

  const handleDateChange = (date) => {
    setState((prevState) => ({
      ...prevState,
      date: format(new Date(date), "yyyy-MM-dd"),
    }));
  };

  const handleTimeChange = (e) => {
    setState((prevState) => ({ ...prevState, time: e.target.value }));
  };

  const handleBeginnerFriendlyChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      beginner_friendly: e.target.checked,
    }));
  };

  const handleWomenOnlyChange = (e) => {
    setState((prevState) => ({ ...prevState, women_only: e.target.checked }));
  };

  const handleEventButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sport_name: state.sport,
        latitude: roundToDecimalPlaces(state.latitude, 6),
        longitude: roundToDecimalPlaces(state.longitude, 6),
        date: state.date,
        time: state.time,
        beginner_friendly: state.beginner_friendly,
        women_only: state.women_only,
      }),
    };
    console.log(requestOptions);
    fetch("/api/create-event", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Navbar />
      <React.Fragment>
        <StyledGrid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "140vh" }}
        >
          <CenteredContainer maxWidth="sm">
            <StyledPaper>
              <Typography
                variant="h3"
                gutterBottom
                align="center"
                style={{
                  marginBottom: "2rem",
                  fontWeight: "bold",
                  color: "#1e5d8c",
                }}
              >
                Event Details
              </Typography>

              <Grid container spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        required={true}
                        type="string"
                        onChange={handleSportChange}
                      />
                      <FormHelperText align="center">Sport</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <DatePicker onChange={handleDateChange} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        required={true}
                        type="time"
                        onChange={handleTimeChange}
                        defaultValue={"10:00"}
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                      />
                      <FormHelperText align="center">Time</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (autocompleteRef.current = autocomplete)
                        }
                        onPlaceChanged={() => {
                          const place = autocompleteRef.current.getPlace();
                          const location = place.geometry.location;
                          setState((prevState) => ({
                            ...prevState,
                            latitude: location.lat(),
                            longitude: location.lng(),
                          }));
                        }}
                      >
                        <TextField
                          required
                          label="Address"
                          type="text"
                          fullWidth
                        />
                      </Autocomplete>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.beginner_friendly}
                        onChange={handleBeginnerFriendlyChange}
                      />
                    }
                    label="Beginner Friendly"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.women_only}
                        onChange={handleWomenOnlyChange}
                      />
                    }
                    label="Women Only"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ height: "400px", width: "100%" }}>
                    {state.latitude && state.longitude ? (
                      <GoogleMap
                        center={{
                          lat: parseFloat(state.latitude),
                          lng: parseFloat(state.longitude),
                        }}
                        zoom={state.zoom}
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                      >
                        <Marker
                          position={{
                            lat: parseFloat(state.latitude),
                            lng: parseFloat(state.longitude),
                          }}
                          label=""
                        />
                      </GoogleMap>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} align="center">
                  <Button
                    variant="contained"
                    onClick={handleEventButtonPressed}
                    fullWidth
                    sx={{
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
                    Create An Event
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} align="center">
                  <Button
                    variant="contained"
                    to="/"
                    component={Link}
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(90deg, #1d8fac 0%, #6aa4e4 100%)",
                      color: "#fff",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </CenteredContainer>
        </StyledGrid>
      </React.Fragment>

      <AppFooter />
    </>
  );
};

export default CreateEventPage;
