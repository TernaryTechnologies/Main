import React, { Component } from "react";
import {Link} from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/material";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLocation: {
        latitude: 34.057919,
        longitude: -117.821342,
      },
      zoom: 11
    };
    
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
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
        maximumAge: 0
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  
  
  render() {
    const zoom = this.state.zoom;
    const { latitude, longitude } = this.state.currLocation;
    return (
      <div>
        <div className="header">
          <h1>Sport Squad</h1>

          <form className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
          
          <h2>
            
              <Button color='primary' variant='contained' to='/login' component={Link}>
                Login
              </Button>
            
            
              <Button color='primary' variant='contained' to='/register' component={Link}>
                Register
              </Button>

          </h2>
          
        </div>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Events</Link></li>
            <li><Link to="/">Teams</Link></li>
            <li><Link to="/">Profile</Link></li>
          </ul>
        </nav>
        <div style={{height: '250px', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB_sMVgUoBDYt8hNkW_cEorXESyE93jOgg' }}
            center={{lat: latitude,lng: longitude}}
            zoom={zoom}
          >
            <AnyReactComponent
              lat={latitude}
              lng={longitude}
              text="You Are Here"
            />
          </GoogleMapReact>
        </div>
        <div className="content-wrapper">
          <h2>Welcome to the Squad!</h2>
          <p>This application is meant to connect sports enthusiasts and facilitate pickup games.</p>
          <button>Get Started</button>
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
}