import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AppBar, Button, Card, CardContent, CardMedia, IconButton, Toolbar, Typography} from "@mui/material";
import { AuthContext } from "./App";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ActionBlock from "./ActionBlock";
import Hero from "./Hero";
import AppFooter from "./AppFooter";
import withRoot from "./withRoot";
import Box from "@mui/material/Box";
import FilteredEvents from "./FilteredEvents";
import Grid from "@mui/material/Grid";
import AppForm from "./AppForm";

function HomePage() {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  const navigate = useNavigate();

  const [currLocation, setCurrLocation] = useState({
    latitude: 34.057919,
    longitude: -117.821342,
  });
  const [zoom, setZoom] = useState(11);
  const [nearbyEvents, setNearbyEvents] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrLocation({
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
  }, []);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const { latitude, longitude } = currLocation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/all");
        const data = await response.json();
        setNearbyEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Sport Squad</h1>
        <h2>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: "white", marginRight: "10px" }}>
                Welcome, {user.username}!
              </div>
              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  to="/login"
                  component={Link}
                >
                  Login
                </Button>
              </div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  to="/register"
                  component={Link}
                >
                  Register
                </Button>
              </div>
            </div>
          )}
        </h2>
      </div>

      <Navbar/>
      <Hero/>
      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
              {/*  {nearbyEvents.map((event) => (
                    <Card sx={{ display: 'flex', }} className={"events-card"} key={event.id}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h5" style={{fontSize: '16px'}}>
                            <Link to={`/api/all/${event.id}`}>{event.sport.name}</Link>
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                          </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                      </Box>
                      <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image="https://ec.europa.eu/eurostat/documents/6921402/9104237/Shutterstock_Lisa_Kolbasa.png/f988f8b6-4138-4a91-9761-885bacab0ce2?t=1533725002000"
                          alt="Live from space album cover"
                      />
                    </Card>
                ))}*/}
              <AppForm>
                <Typography variant="h3" gutterBottom marked="center" align="center" style={{fontFamily: 'Open Sans\', sans-serif'}}>
                  Events
                </Typography>
                <Grid container spacing={2}>
                  <FilteredEvents latitude={latitude} longitude={longitude} />
                </Grid>
              </AppForm>
          </div>

          <div style={{ width: "50%" }}>
            <div className="map-container">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: latitude, lng: longitude }}
                zoom={zoom}
              >
                <Marker
                  position={{ lat: latitude, lng: longitude }}
                  label=""
                />
              </GoogleMap>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ height: "250px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: latitude, lng: longitude }}
              zoom={zoom}
            >
              <Marker
                position={{ lat: latitude, lng: longitude }}
                label=""
              />
            </GoogleMap>
          </div>
        </div>
      )}

      <AppFooter/>
    </div>
  );
}

export default withRoot(HomePage);
