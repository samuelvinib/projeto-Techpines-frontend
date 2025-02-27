import React from 'react';
import {Button, Box, Typography} from '@mui/material';

interface MusicPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const MusicPagination: React.FC<MusicPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Anterior
            </Button>
            <Box sx={{ mx: 2 }}>
                <Typography variant="body1">{`${currentPage} / ${totalPages}`}</Typography>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Próximo
            </Button>
        </Box>
    );
};

export default MusicPagination;
