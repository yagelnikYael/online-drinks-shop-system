import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './LoginSlice';
import { Box, TextField, Button, Typography, Container, Paper, Alert, Modal, Fade, Backdrop, Divider } from '@mui/material'; //MUI
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

function Login({ open, handleClose }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (isAdmin = false) => {
        setError(null);
        setLoading(true);

        if (isAdmin) {
            if (username === 'admin' && password === '1234') {
                const adminUser = {
                    username: 'admin',
                    role: 'admin'
                };
                dispatch(login(adminUser));
                setLoading(false);
                setUsername('');
                setPassword('');
                handleClose();
                return;
            } else {
                setError('פרטי התחברות שגויים למנהל');
                setLoading(false);
                setTimeout(() => {
                    setUsername('');
                    setPassword('');
                    setError(false);
                }, 1500);
                return;
            }
        }

        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 401) {
                    setError(errorData.message || 'שם משתמש או סיסמה שגויים. אנא נסה/י שוב.');
                } else if (res.status === 400) {
                    setError(errorData.message || 'נתוני התחברות שגויים. אנא וודא/י.');
                } else {
                    setError(errorData.message || 'שגיאה כללית בהתחברות. אנא נסה שוב.');
                }
                setLoading(false);
                setTimeout(() => {
                    setUsername('');
                    setPassword('');
                    setError(false);
                }, 1500);
                return;
            }

            const user = await res.json();
            dispatch(login(user));
            setLoading(false);
            setUsername('');
            setPassword('');
            handleClose();
            
        } catch (err) {
            setError('שגיאת תקשורת עם השרת. אנא נסה שוב.',err);
            setLoading(false);
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose} // זו הפונקציה שנסגור איתה בלחיצה על הרקע
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
                        התחברות
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמה"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#2b4f3f', '&:hover': { backgroundColor: '#1a3328' } }}
                        onClick={() => handleLogin(false)}
                    >
                        התחבר
                    </Button>
                    
                    <Divider sx={{ my: 2 }}>או</Divider>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ 
                            mt: 2, 
                            mb: 2, 
                            borderColor: '#2b4f3f',
                            color: '#2b4f3f',
                            '&:hover': { 
                                borderColor: '#1a3328',
                                backgroundColor: '#e8f5e9'
                            } 
                        }}
                        onClick={() => handleLogin(true)}
                    >
                        התחבר כמנהל
                    </Button>
                </Box>
            </Fade>
        </Modal >
    );
}

export default Login;
