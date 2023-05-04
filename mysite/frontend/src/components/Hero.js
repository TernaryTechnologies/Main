import React, {useContext} from 'react';
import { Button } from '@mui/material';
import Typography from '../components/Typography';
import ProductHeroLayout from '../modules/HeroLayout';
import { AuthContext } from "./App";


const backgroundImage =
    'https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

export default function Hero() {

    const { state, dispatch } = useContext(AuthContext);
    const { isAuthenticated, user } = state;
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                Welcome to the Squad!
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
                This application is meant to connect sports enthusiasts and facilitate pickup games.
            </Typography>
           {
           !isAuthenticated && (
                <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/register"
                sx={{ minWidth: 200, 
                    transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",}, }}
            >
                Get Started
            </Button>
            )
           }
        </ProductHeroLayout>
    );
}
