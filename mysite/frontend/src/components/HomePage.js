import React, { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/material";
import { AuthContext } from "./App";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function HomePage() {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, user } = useContext(AuthContext).state;
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

  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Events", link: "/create" },
    { label: "Teams", link: "/" },
    { label: "Profile", link: "/" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/event/");
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
  
        <form className="search-bar">
          <input type="text" placeholder="Search" />
            <Button variant="contained" color="primary" size="small">
              Search
            </Button>
        </form>
  
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
  
      <nav className="navbar">
        <ul>
          {navLinks.map((navLink) => (
            <li key={navLink.label}>
              <Link to={navLink.link}>{navLink.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
  
      <div style={{ display: "flex", height: "400px" }}>
        
        <div style={{ width: "50%" }}>
            <div className="nearby-parks-container">
              <h2>Nearby Events</h2>
              <p>
                There is a Basketball game near you in Pomona going on at 5:00 PM <br></br>
                Code: "GLRELM" <br></br>
              </p>
              <ul>
                {nearbyEvents.map((event) => (
                  <li key={event.id}>
                  <Link to={`/event/${event.id}`}>{event.sport}</Link>
                </li>
                ))}
              </ul>
            </div>
          </div>

        <div style={{ width: "50%" }}>
          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyB_sMVgUoBDYt8hNkW_cEorXESyE93jOgg",
              }}
              center={latitude && longitude ? { lat: latitude, lng: longitude } : undefined}
              zoom={zoom}
            >
                <AnyReactComponent
                  lat={latitude}
                  lng={longitude}
                  text="You Are Here"
                />
              {nearbyEvents.map((event) => (
                <AnyReactComponent 
                  key={event.id}
                  lat={event.latitude}
                  lng={event.longitude}
                  text={event.name}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <h2>Welcome to the Squad!</h2>
        <p>This application is meant to connect sports enthusiasts and facilitate pickup games.</p>
        <Button color="primary" variant="contained" component={Link} to="/register">Get Started</Button>
      </div>

      <footer>
      <div className="footer-wrapper">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are a pickup sports application dedicated to connecting players and creating communities through sports.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@pickupsportsapp.com</p>
          <p>Phone: 555-555-5555</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-media-icons">
            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>

    </div>
  );
}


export default HomePage;