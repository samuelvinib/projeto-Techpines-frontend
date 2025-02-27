import React, { useState } from 'react';
import { createMusic } from '../../services/music';
import { Music } from '../../types/music';
import { TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Para redirecionar a página

const MusicForm: React.FC = () => {
    const [data, setData] = useState<Music>({ url: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success'); // Pode ser 'success' ou 'error'

    const navigate = useNavigate(); // Hook do React Router para navegação

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(data);
            await createMusic(data);
            setMessage('Música enviada com sucesso!');
            setSeverity('success');
            setOpenSnackbar(true);
            // Redirecionar para a página Home após sucesso
            setTimeout(() => {
                navigate('/');
            }, 2000); // Aguarda 2 segundos antes de redirecionar
        } catch (error) {
            console.error(error);
            setMessage('Erro ao enviar música.');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ width: 400, margin: 'auto', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Sugira uma nova música
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Link do YouTube"
                    value={data.url}
                    onChange={(e) => setData({ ...data, url: e.target.value })}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Enviar Música
                </Button>
            </form>

            {/* Snackbar para mostrar as mensagens de sucesso ou erro */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Duração do alerta (em milissegundos)
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posiciona o Snackbar no topo
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MusicForm;
