import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, MenuItem, Typography, Menu } from "@mui/material";
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ onOpenLogin, onOpenRegister }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const currentUser = useSelector((state) => state.login.currentUser);//אם המשתמש מחובר

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate();

    const handleMenuScroll = (sectionId) => {
        navigate('/products'); // קודם לנווט
        setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300); // מספיק זמן ל־React לטעון את הדף
    }
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleClick = (event) => { // פונ  לפתיחת התפריט
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {//סגירת התפריט
        setAnchorEl(null);
    }

    const scrollToFooter = () => { // פונ גלילה לפוטר
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => { //פונ גלילה לראש
        const homeTopElement = document.getElementById('home-top')
        if (homeTopElement)
            homeTopElement.scrollIntoView({ behavior: 'smooth' });
        else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    const handleHomeClick = (event) => {
        if (location.pathname === '/') {
            event.preventDefault();
            scrollToTop();
        }
    };
    return (
        ///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        <AppBar position="sticky" sx={{
            backgroundColor: scrolled ? 'rgba(250, 249, 248, 0.8)' : '#faf9f8',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backdropFilter: scrolled ? 'blur(6px)' : 'none',
            transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
        }}>
            <Toolbar sx={{ justifyContent: 'flex-start', paddingY: { xs: 2, md: 2 } }}>
                <Typography variant="h4" component={RouterLink} to="/" onClick={handleHomeClick} sx={{ color: '#2b4f3f', fontWeight: 'bold', marginRight: { xs: 4, md: 40 }, paddingLeft: { xs: 2, md: 8 }, textDecoration: 'none', '&:hover': { color: '#1a3328' }, }}>
                    DRINKS
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Button component={Link} to="/feedback" color="inherit" sx={{ color: '#333333', textTransform: 'none', fontSize: '1.2rem', mr: 2, marginRight: { xs: 4, md: 5 } }}>
                        Feedback
                    </Button>

                    <Button
                        color="inherit"
                        sx={{ color: '#333333', textTransform: 'none', fontSize: '1.2rem', mr: 2, marginRight: { xs: 4, md: 5 } }}
                        onClick={scrollToFooter}>
                        Contact
                    </Button>

                    <Button component={Link} to="/about" color="inherit" sx={{ color: '#333333', textTransform: 'none', fontSize: '1.2rem', mr: 2, marginRight: { xs: 4, md: 5 } }}>
                        About
                    </Button>

                    <Button
                        id="product-button"
                        aria-controls={open ? 'products-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                        sx={{ color: '#333333', textTransform: 'none', fontSize: '1.2rem', mr: 2, marginRight: { xs: 4, md: 5 } }}>
                        Products
                    </Button>
                    <Menu
                        id="products-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'products-button' }} >

                        <MenuItem onClick={handleClose} component={Link} to="/products">
                            כל המוצרים
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleMenuScroll('ice-cream') }} component={Link} to="/products#ice-cream">
                            גלידות
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleMenuScroll('drinks') }} component={Link} to="/products#drinks">
                            משקאות קלים
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleMenuScroll('shakes') }} component={Link} to="/products#shakes">
                            שייקים
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleMenuScroll('ices') }} component={Link} to="/products#ices">
                            אייסים
                        </MenuItem>
                    </Menu>



                    <Button component={RouterLink} to="/" onClick={handleHomeClick} color="inherit" sx={{ color: '#333333', textTransform: 'none', fontSize: '1.2rem', rm: 2, marginRight: { xs: 4, md: 20 } }}>
                        Home
                    </Button>

                    {currentUser ? (
                        <Button component={Link} to="/logout" variant="contained" sx={{
                            backgroundColor: '#d32f2f',
                            color: '#ffffff',
                            textTransform: 'none',
                            fontSize: '1rem',
                            ml: 2,
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                            }
                        }}>
                            התנתק/י
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#2b4f3f',
                                    borderColor: '#2b4f3f',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    ml: 2,
                                    '&:hover': {
                                        borderColor: '#1a3328',
                                        backgroundColor: '#e8f5e9',
                                    }
                                }}
                                onClick={onOpenLogin}
                            >
                                התחבר
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#2b4f3f',
                                    color: '#ffffff',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    ml: 1,

                                    '&:hover': {
                                        backgroundColor: '#1a3328',
                                    }
                                }}
                                onClick={onOpenRegister}
                            >
                                הרשם
                            </Button>
                        </>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
    )

}
export default Navbar;