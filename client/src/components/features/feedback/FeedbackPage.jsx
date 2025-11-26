// src/component/features/feedback/FeedbackPage.jsx

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Container, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import feedback1 from '../../../assets/images/פידבקים/s.png';
import feedback2 from '../../../assets/images/פידבקים/w.png';
import feedback3 from '../../../assets/images/פידבקים/r.png';
import feedback4 from '../../../assets/images/פידבקים/a.png';




// רשימת התמונות
const feedbackImages = [
  { src: feedback1, alt: 'פידבק מלקוח 1' },
  { src: feedback2, alt: 'פידבק מלקוח 2' },
  { src: feedback3, alt: 'פידבק מלקוח 3' },
  { src: feedback4, alt: 'פידבק מלקוח 4' }
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  const theme = useTheme();
  return (
    <IconButton
      className={className}
      onClick={onClick}
      sx={{
        backgroundColor: '#2b4f3f',
        color: '#faf9f8',
        '&:hover': {
          backgroundColor: '#faf9f8', color: "#2b4f3f"
        },
        zIndex: 2,
        position: 'absolute',
        top: '50%',
        right: { xs: '5px', sm: '-40px' },
        transform: 'translateY(-50%)',
        '&::before': {
          display: 'none',
        },
        // עיצוב לכפתור
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        boxShadow: theme.shadows[6],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

// קומפוננטת חץ לימין
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  const theme = useTheme(); 
  return (
    <IconButton
      className={className}
      onClick={onClick}
      sx={{
        backgroundColor: "#2b4f3f",
        color: '#faf9f8',
        '&:hover': {
          backgroundColor: '#faf9f8', color: "#2b4f3f"
        },
        zIndex: 2,
        position: 'absolute',
        top: '50%',
        left: { xs: '5px', sm: '-40px' },
        transform: 'translateY(-50%)',
        '&::before': {
          display: 'none',
        },
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        boxShadow: theme.shadows[3],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <ArrowForwardIosIcon />

    </IconButton>
  );
};

export default function FeedbackCarousel() {
  const settings = {   // הגדרות על הקרוסלה
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

  };

  return (
    <Container dir="rtl" sx={{
      mt: 5,
      mb: 6,
      backgroundColor: '#faf9f8',
      p: 4,
      borderRadius: 2,
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      maxWidth: { xs: '95%', sm: '80%', md: '80%', lg: '60%' },
      position: 'relative',
    }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          color: '#2b4f3f',
          mb: 4,
          fontWeight: 'bold',
          textShadow: `1px 1px 3px #2b4f3f`,
        }}
      >
        מה הלקוחות שלנו אומרים?
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          color: '#2b4f3f',
          mb: 5,
          opacity: 0.8,
        }}
      >
        קבלו הצצה לפידבקים החמים והמרוגשים שקיבלנו מלקוחותינו המרוצים!
      </Typography>

      <Box sx={{ position: 'relative', px: { xs: 0, sm: 5 } }}>
        {feedbackImages.length > 0 ? (
          <Slider {...settings}>
            {feedbackImages.map((item, index) => (
              <Box key={index} sx={{ px: 1 }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    maxHeight: '310px',
                    objectFit: 'contain',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography variant="h6" align="center" color='#2b4f3f'>
            אין פידבקים להצגה כרגע.
          </Typography>
        )}
      </Box>
    </Container>
  );
}