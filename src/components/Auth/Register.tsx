import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { RegisterData } from '../../types/user';
import { TextField, Button, Container, Typography, Box, Grid, Snackbar, Alert } from '@mui/material';

const Register: React.FC = () => {
    const [data, setData] = useState<RegisterData>({ name: '', email: '', password: '', password_confirmation: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(data);
            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            navigate('/login');
        } catch (error: any) {
            // Extracting error messages from the response
            const errorMessages = Object.values(error.response?.data?.error || {})
                .flat()
                .join(' ');  // Join all error messages in one string

            setSnackbarMessage(errorMessages || 'Registration failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={data.password_confirmation}
                                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Button onClick={() => navigate('/login')} color="primary">
                            Login here
                        </Button>
                    </Typography>
                </Box>
            </Box>

            {/* Snackbar for feedback */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;
