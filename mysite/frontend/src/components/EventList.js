import React, { Component } from 'react';
import Event from './Event';

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.sport = props.sport;
    this.items = [];
    this.data = [];
    this.getEventDetails();
    
  }

  getEventDetails() {
    fetch('/events/get' + '?sport=' + this.sport)
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
        this.forceUpdate();
      });
  }

  
  render() {
    console.log(this.data);
    const items = this.data.map(item => 
      <Event code={item.code} city={item.city} sport={item.sport} dateTime={item.dateTime}  />
      )
    
    return (
      
      <ul>{items}</ul>
    )
    
  }
}