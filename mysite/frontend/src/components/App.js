import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Pickup Sports Club</h1>
          <form className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Teams</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
        <div className="banner">
          <h2>Map View</h2>
        </div>
        <div className="content-wrapper">
          <h2>Welcome to My App</h2>
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

const appDiv = document.getElementById("app");
render(<App />, appDiv);

