import React from 'react';
import { Music } from '../../types/music';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

interface MusicItemProps {
    music: Music;
}

const MusicItem: React.FC<MusicItemProps> = ({ music }) => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '250px',
            height: '350px',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '12px',
            boxShadow: 3,
            overflow: 'hidden'
        }}>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: '140px', objectFit: 'cover' }}
                image={music.cover}
                alt={music.title}
            />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexGrow: 1
            }}>
                <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {music.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', color: 'gray' }}>
                    {music.views} views
                </Typography>
            </CardContent>
            <Box sx={{ padding: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    href={music.url}
                    target="_blank"
                    sx={{ fontSize: '0.8rem', padding: '6px 12px', borderRadius: '20px' }}
                >
                    Assistir no YouTube
                </Button>
            </Box>
        </Card>
    );
};

export default MusicItem;
