import React, { Component } from 'react';

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.city = props.city;
    this.sport = props.sport;
    this.dateTime = props.dateTime;
    this.code = props.code;
  }

  render() {
    return (
      <div>
        <h2>Event: {this.code}</h2>
        <h2>Sport: {this.sport}</h2>
        <h2>City: {this.city}</h2>
      </div>
    );
  }
}