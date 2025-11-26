import React from "react";

import drinks from '../../../assets/images/Home/4drinks.png';
import { Box, Container, Typography } from "@mui/material";

function HeroSection() {
    return (
        <Box
            id="home-top"
            sx={{
                backgroundColor: '#d0e4e5',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: { xs: 3, md: 6 }
            }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{ color: '#2b4f3f', fontWeight: 'bold', marginBottom: 2, }}
                >
                    Refreshing Drinks
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ color: '#455a64', scrollMarginBottom: 6, maxWidth: 600, margin: '0 auto 48px auto', }}
                >
                    Quench your thirst with our cool and flavorful selection of drinks.
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: { xs: 2, md: 4 },
                    width: '100%',
                }}>

                    <Box
                        component="img"
                        src={drinks}
                        alt="Delicious Drink 1"
                        sx={{
                            width: { xs: '45%', sm: '115%' },
                            maxWidth: '500',
                            height: 'auto',
                            objectFit: 'contain'
                        }}
                    />


                </Box>
            </Container>
        </Box>
    )

}
export default HeroSection;