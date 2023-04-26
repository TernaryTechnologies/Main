import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="#">
                All Rights Reserved
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc071',
    mr: 1,
    '&:hover': {
        bgcolor: '#ffc071',
    },
};

export default function AppFooter() {
    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: '#fff5f8' }}
        >
            <Container sx={{ my: 8, display: 'flex' }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ height: 120 }}
                        >
                            <Grid item sx={{ display: 'flex' }}>
                                <Box component="a" href="https://www.facebook.com/profile.php?id=100091758387709" sx={iconStyle}>
                                    <img
                                        src="https://mui.com/static/themes/onepirate/appFooterFacebook.png"
                                        alt="Facebook"
                                    />
                                </Box>
                                <Box component="a" href="https://twitter.com/Sportsquadus" sx={iconStyle}>
                                    <img
                                        src="https://mui.com/static/themes/onepirate/appFooterTwitter.png"
                                        alt="Twitter"
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0}}>
                                <Link to="/terms" component={RouterLink} sx={{ display: 'block', py: 0 }}>Terms</Link>
                            </Box>
                            {/* <Box component="li" sx={{ py: 0.5 }}>
                                <Link to="/create" component={RouterLink} sx={{ display: 'block', py: 1 }}>Privacy</Link>
                            </Box> */}
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Contact
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Typography>Email:  sportsquadofficial@outlook.com</Typography>
                                <Typography>Phone:  555-555-5555</Typography>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
