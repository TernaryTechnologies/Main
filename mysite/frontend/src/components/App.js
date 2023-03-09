import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom"
import HomePage from "./HomePage";
import CreateEventPage from "./CreateEventPage";
import EventList from "./EventList";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/create' element={<CreateEventPage />} />
          <Route exact path='/test' element={<EventList sport='soccer' />} /> 
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

