import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLoginButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      
    };
    console.log(requestOptions)
    fetch('/members/login/', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Logging In
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='string'
              onChange={this.handleUsernameChange}
              inputProps={{
                style: {textAlign: 'center'},
              }}  
              />
            <FormHelperText>
                <div align='center'>Username</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='password'
              onChange={this.handlePasswordChange}
              inputProps={{
                style: {textAlign: 'center'},
              }}  
              />
            <FormHelperText>
                <div align='center'>Password</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} align="center">
          <Button color='primary' variant='contained' onClick={this.handleLoginButtonPressed}>
            Log In
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
