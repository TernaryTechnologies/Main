import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import { Link } from "react-router-dom";

export default class CreateEventPage extends Component {
  constructor(props) {
    super(props);
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
          <DatePicker />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type='time'
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
          <Button color='primary' variant='contained'>
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
