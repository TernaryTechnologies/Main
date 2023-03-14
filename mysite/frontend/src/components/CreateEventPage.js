import React, { Component } from "react";
import { format } from 'date-fns'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Link } from "react-router-dom";

export default class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: '',
      city: '',
      date: format(new Date(), 'yyyy/MM/dd'),
      time: '10:00',
    };

    this.handleEventButtonPressed = this.handleEventButtonPressed.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleSportChange(e) {
    this.setState({
      sport: e.target.value,
    });
  }

  handleCityChange(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handleDateChange = (date) => {
    this.setState({
      date: format(new Date(date), 'yyyy/MM/dd'),
    });
  };

  handleTimeChange(e) {
    this.setState({
      time: e.target.value,
    });
  }

  handleEventButtonPressed() {
    
    const requestOptions = {
      method: 'POST',
      header: {'Accept': 'application/json;','Content-Type': 'application/json;'},
      body: JSON.stringify({
        sport: this.state.sport,
        city: this.state.city,
        date: this.state.date,
        time: this.state.time,
      }),
    };
    fetch('/api/create-event', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Event Details
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='string'
              onChange={this.handleSportChange}
              inputProps={{
                style: {textAlign: 'center'},
              }}  
              />
            <FormHelperText>
                <div align='center'>Sport</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='string'
              onChange={this.handleCityChange}
              inputProps={{
                style: {textAlign: 'center'},
              }}  
              />
            <FormHelperText>
                <div align='center'>City</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <DatePicker 
            onChange={this.handleDateChange}/>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='time'
              onChange={this.handleTimeChange}
              defaultValue={'10:00'}
              inputProps={{
                style: {textAlign: 'center'},
                
              }}
              />
            <FormHelperText>
                <div align='center'>Time</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color='primary' variant='contained' onClick={this.handleEventButtonPressed}>
            Create An Event
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color='secondary' variant='contained' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
