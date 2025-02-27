import React, { useState, useEffect } from 'react';
import { getMusicList } from '../../services/music';
import MusicItem from './MusicItem';
import MusicPagination from './MusicPagination';
import { Music } from '../../types/music';
import { Grid, Box, Typography, List, ListItem, ListItemText, Divider, Link } from '@mui/material';

const MusicList: React.FC = () => {
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [topFive, setTopFive] = useState<Music[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    useEffect(() => {
        const fetchMusicList = async () => {
            const response = await getMusicList(page, 10);
            setMusicList(response.data);
            setTotalPages(response.last_page);
        };
        fetchMusicList();
    }, [page]);

    useEffect(() => {
        const fetchTopFive = async () => {
            const response = await getMusicList(1);
            setTopFive(response.data.slice(0, 5));
        };
        fetchTopFive();
    }, []);

    return (
        <Box sx={{ padding: 3, display: 'flex', gap: 4 }}>
            {/* Seção esquerda: Top 5 Músicas */}
            <Box sx={{ flex: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }}>
                    Top 5 Músicas Mais Tocadas
                </Typography>
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {topFive.map((music) => (
                        <Grid item key={music.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <MusicItem music={music} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Seção direita: Lista de músicas mais tocadas */}
            <Box sx={{ flex: 1, maxHeight: '800px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Mais Tocadas
                </Typography>
                <List>
                    {musicList.map((music, index) => (
                        <React.Fragment key={music.id}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Link href={music.url} target="_blank" rel="noopener noreferrer" underline="hover">
                                            {`${((page -1) * 10) + (index + 1)}. ${music.title}`}
                                        </Link>
                                    }
                                    secondary={`${music.views} views`}
                                />
                            </ListItem>
                            {index < musicList.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <MusicPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MusicList;
