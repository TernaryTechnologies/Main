import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Checkbox,
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

function roundToDecimalPlaces(value, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

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
      <Grid container spacing={2} style={{ padding: "100px 0" }}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Event Details
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="string"
              onChange={handleSportChange}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <span align="center">Sport</span>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <DatePicker onChange={handleDateChange} />
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="time"
              onChange={handleTimeChange}
              defaultValue={"10:00"}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <span align="center">Time</span>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
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
            <TextField required label="Address" type="text" />
          </Autocomplete>
        </Grid>
        <Grid item xs={12} align="center">
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
        <Grid item xs={12} align="center">
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
        <Grid item xs={12} align="center">
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
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleEventButtonPressed}
          >
            Create An Event
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
  );
};

export default CreateEventPage;
