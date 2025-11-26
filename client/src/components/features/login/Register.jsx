
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Alert, CircularProgress, Modal, Fade, Backdrop } from '@mui/material'; // MUI
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    direction: 'rtl'
}


function Register({ open, handleClose, onOpenLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); 
    const [loading, setLoading] = useState(false);


    const handleRegister = async () => {
        setError(null);
        setSuccess(false);
        setLoading(true);

        if (!username || !password) { 
            setError("שם משתמש וסיסמה הם שדות חובה.");
            setLoading(false);

            return;
        }

        try {
            const res = await fetch("http://localhost:4000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 409) {
                    setError(errorData.message || "שם משתמש זה כבר קיים.");
                } else if (res.status === 400) {
                    setError(errorData.message || "שגיאה בנתוני ההרשמה.");
                } else {
                    setError(errorData.message || "שגיאה כללית בהרשמה. אנא נסה שוב.");
                }
                setLoading(false);
                setTimeout(() => {
                    setUsername('');
                    setPassword('');
                    setError(null);

                }, 1500);

                return;
            }
            setSuccess(true); // הצג הודעת הצלחה
            setLoading(false);
            setTimeout(() => {

                setUsername('')
                setPassword('')

            }, 1700);

            setTimeout(() => {
                handleClose();
                if (onOpenLogin) {
                    setSuccess(false)
                    onOpenLogin();
                }
            }, 1700);

        } catch (err) {
            setError('שגיאת תקשורת עם השרת. אנא נסה שוב.');
            setLoading(false);
            setTimeout(() => {
                setUsername(''); 
                setPassword(''); 
            }, 1500); 
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>

                    <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                        הרשמה
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>נרשמת בהצלחה! תועבר/י לדף ההתחברות בעוד מספר שניות.</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="שם משתמש"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(null); }}
                        error={!!error && !username}
                        helperText={!!error && !username ? "שם משתמש חובה" : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמה"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(null); }}
                        error={!!error && !password}
                        helperText={!!error && !password ? "סיסמה חובה" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#2b4f3f', '&:hover': { backgroundColor: '#1a3328' } }}
                        onClick={handleRegister}
                        disabled={loading || success}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "הרשם"}
                    </Button>
                </Box>
            </Fade>
        </Modal>



    );
}

export default Register;