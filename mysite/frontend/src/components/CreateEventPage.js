import React, { Component } from "react";
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
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: "",
      date: format(new Date(), "yyyy/MM/dd"),
      time: "10:00",
      latitude: 34.057919,
      longitude: -117.821342,
      beginner_friendly: false,
      women_only: false,
      zoom: 12,
    };

    this.handleEventButtonPressed = this.handleEventButtonPressed.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.handleBeginnerFriendlyChange =
      this.handleBeginnerFriendlyChange.bind(this);
    this.handleWomenOnlyChange = this.handleWomenOnlyChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
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
  }

  handleSportChange(e) {
    this.setState({
      sport: e.target.value,
    });
  }

  handleDateChange = (date) => {
    this.setState({
      date: format(new Date(date), "yyyy-MM-dd"),
    });
  };

  handleTimeChange(e) {
    this.setState({
      time: e.target.value,
    });
  }

  handleLatitudeChange(e) {
    this.setState({
      latitude: e.target.value,
    });
  }

  handleLongitudeChange(e) {
    this.setState({
      longitude: e.target.value,
    });
  }

  handleBeginnerFriendlyChange(e) {
    this.setState({
      beginner_friendly: e.target.checked,
    });
  }

  handleWomenOnlyChange(e) {
    this.setState({
      women_only: e.target.checked,
    });
  }

  handleEventButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sport_name: this.state.sport,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        date: this.state.date,
        time: this.state.time,
        beginner_friendly: this.state.beginner_friendly,
        women_only: this.state.women_only,
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
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
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
              onChange={this.handleSportChange}
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
            <DatePicker onChange={this.handleDateChange} />
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="time"
              onChange={this.handleTimeChange}
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
          <TextField
            required
            label="Latitude"
            type="number"
            step="0.000001"
            value={this.state.latitude}
            onChange={this.handleLatitudeChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            required
            label="Longitude"
            type="number"
            step="0.000001"
            value={this.state.longitude}
            onChange={this.handleLongitudeChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.beginner_friendly}
                onChange={this.handleBeginnerFriendlyChange}
              />
            }
            label="Beginner Friendly"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.women_only}
                onChange={this.handleWomenOnlyChange}
              />
            }
            label="Women Only"
          />
        </Grid>
        <Grid item xs={12} align="center">
        <div style={{ height: '400px', width: '100%' }}>
  <GoogleMapReact
    bootstrapURLKeys={{
      key: "AIzaSyB_sMVgUoBDYt8hNkW_cEorXESyE93jOgg",
    }}
    center={
      this.state.latitude && this.state.longitude
        ? { lat: parseFloat(this.state.latitude), lng: parseFloat(this.state.longitude) }
        : undefined
    }
    zoom={this.state.zoom}
  >
    {this.state.latitude && this.state.longitude && (
      <AnyReactComponent
        lat={parseFloat(this.state.latitude)}
        lng={parseFloat(this.state.longitude)}
        text="You Are Here"
      />
    )}
  </GoogleMapReact>
</div>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleEventButtonPressed}
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
  }
}
