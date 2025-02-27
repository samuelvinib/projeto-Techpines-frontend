import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login , me} from '../../services/auth';
import { LoginData } from '../../types/user';
import { TextField, Button, Container, Typography, Box, Grid, Snackbar, Alert } from '@mui/material';

const Login: React.FC = () => {
    const [data, setData] = useState<LoginData>({ email: '', password: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(data);
            localStorage.setItem('token', response.access_token);
            const userInfo = await me();
            localStorage.setItem('role', JSON.stringify(userInfo.role));

            setSnackbarMessage('Login realizado com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Aguarde um pequeno tempo e recarregue a aplicação
            setTimeout(() => {
                window.location.href = '/';  // Recarrega a aplicação completamente
            }, 500);

        } catch (error: any) {
            const errorMessages = Object.values(error.response?.data?.error || {})
                .flat()
                .join(' ');

            setSnackbarMessage(errorMessages || 'Falha no login. Verifique suas credenciais.');
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
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
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
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Button onClick={() => navigate('/register')} color="primary">
                            Register here
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

export default Login;
