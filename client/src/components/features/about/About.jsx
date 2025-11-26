import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import backgroundImage from '../../../assets/images/Home/x.png'

function About() {
    return (
        <Box
            sx={{
                backgroundColor: '#d8e7e7', 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'small',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                textAlign: 'center',
                direction: 'rtl'
            }}
        >
            <Container maxWidth="md">
                <Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 4 }}>

                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#2b4f3f' }}>
                        מי אנחנו
                    </Typography>
                    <Typography variant="h6" paragraph sx={{color: '#2b4f3f',fontWeight: 'bold'}}>
                        ברוכה הבאה ל־DRINKS – המקום שבו כל לגימה היא חוויה.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        אנחנו לא עוד בר שייקים. אנחנו צוות של אנשים שחיים ונושמים רעננות, טעם וצבע.
                        התחלנו את הדרך מתוך אהבה אמיתית למשקאות טבעיים, מרעננים ובריאים – כאלה שלא רק טעים לשתות, אלא גם מרגישים טוב בגוף ובלב.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        המשקאות שלנו מיוצרים מפירות טריים ואיכותיים, עם שילובים יצירתיים ומרעננים, שייקים קפואים בדיוק כמו שצריך, גלידות שמלטפות את הלב, ותה קר שמרגיע גם את היום הכי חם.
                        כל מוצר אצלנו עובר דרך ידיים אוהבות וסטנדרטים גבוהים – כדי שכל לקוחה תרגיש שהיא מקבלת בדיוק את מה שהיא צריכה באותו רגע.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        החזון שלנו פשוט – להפוך רגע קטן של עצירה, לרגע גדול של הנאה.
                        אם את מחפשת טעם שמשלב בריאות, עונג וחיוך – הגעת למקום הנכון.
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ mt: 4, fontWeight: 'bold', color: '#2b4f3f' }}>
                        DRINKS – כי מגיע לך יותר ממשקה. מגיע לך חוויה.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
export default About;