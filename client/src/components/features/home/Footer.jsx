import React from 'react';
import { Box, Typography, Container, Link, IconButton, Grid, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';


function Footer() {
    return (
        <Box
            id="footer"
            component="footer"
            sx={{
                backgroundColor: '#2b4f3f',
                color: '#faf9f8',
                padding: { xs: 4, md: 6 },
                marginTop: 'auto',
                width: '1410px',
                direction: 'rtl'
            }}
        >
            <Container maxWidth="lg" sx={{ mb: 4 }}>
                <Grid container spacing={4} justifyContent={"space-between"}>

                    <Grid item xs={6} sm={4} md={3} sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            קישורים מהירים
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link component={RouterLink} to="/about" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                אודותינו
                            </Link>

                            <Link component={RouterLink} to="" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                מדיניות פרטיות
                            </Link>
                            <Link component={RouterLink} to="" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                תנאי שימוש
                            </Link>
                        </Box>

                    </Grid>
                    <Grid item xs={6} sm={4} md={3} sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            המוצרים שלנו
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link component={RouterLink} to="/products#ices" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                אייסים
                            </Link>
                            <Link component={RouterLink} to="/products#drinks" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                משקאות קלים
                            </Link>
                            <Link component={RouterLink} to="/products#shakes" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                שייקים
                            </Link>
                            <Link component={RouterLink} to="/products#ice-cream" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                גלידות
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2.5} sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            יצירת קשר
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            <Link href="mailto:info@drinks.co.il" color="inherit" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { textDecoration: 'underline' } }}>
                                <Typography variant="body1" sx={{ ml: 1 }}>info@drinks.co.il</Typography>
                                <MailOutlineIcon />
                            </Link>
                            <Link href="https://wa.me/9725XXXXXXXX" target="_blank" color="inherit" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', '&:hover': { textDecoration: 'underline' } }}>
                                <Typography variant="body1" sx={{ ml: 1 }}>05X-XXXXXXX</Typography>
                                <WhatsAppIcon />
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={1.5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            עקבו אחרינו
                        </Typography>
                        <Box>
                            <IconButton color="inherit" href="https://facebook.com" target="_blank" aria-label="Facebook">
                                <FacebookIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" target="_blank" aria-label="Instagram">
                                <InstagramIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="inherit" href="https://x.com" target="_blank" aria-label="X (Twitter)">
                                <XIcon fontSize="large" />
                            </IconButton>

                        </Box>
                    </Grid>


                </Grid>



            </Container>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />

            <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    DRINKS
                </Typography>

            </Grid>

            <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Typography variant="body2">
                    © כל הזכויות שמורות 2025 Drinks .

                </Typography>
            </Box>
        </Box>

    )
}
export default Footer;