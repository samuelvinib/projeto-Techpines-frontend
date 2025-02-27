import React, { useState, useEffect } from 'react';
import { getPendentMusicList, updateMusic } from '../../services/music';
import { Music } from '../../types/music';

const ApprovalList: React.FC = () => {
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await getPendentMusicList();
                console.log(response);
                // Verifique se o response.data é um array antes de definir o estado
                if (Array.isArray(response)) {
                    setMusicList(response);
                    console.log(response);
                } else {
                    setMusicList([]);
                }
            } catch (error) {
                console.error('Erro ao carregar músicas pendentes:', error);
                setMusicList([]);  // Em caso de erro, garantimos que o estado seja um array vazio
            } finally {
                setLoading(false); // Finalize o carregamento
            }
        };

        fetchMusicList();
    }, []);

    const handleApprove = async (id: number) => {
        const musicToUpdate = musicList.find(music => music.id === id);
        if (musicToUpdate) {
            await updateMusic(id, {  status: "approved" });
            setMusicList(prevList => prevList.filter(music => music.id !== id)); // Remove a música aprovada da lista
        }
    };

    const handleReject = async (id: number) => {
        await updateMusic(id, { status: "rejected" });
        setMusicList(prevList => prevList.filter(music => music.id !== id)); // Remove a música rejeitada da lista
    };

    // Verifique se o componente está carregando, caso contrário, mostre as músicas
    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Lista de Aprovação</h2>
            <div>
                {musicList.length > 0 ? (
                    musicList.map((music) => (
                        <div key={music.id} style={styles.musicItem}>
                            <h3 style={styles.musicTitle}>{music.title}</h3>
                            <div style={styles.buttonGroup}>
                                <button
                                    onClick={() => music.id && handleApprove(music.id)}
                                    style={styles.approveButton}
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => music.id && handleReject(music.id)}
                                    style={styles.rejectButton}
                                >
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Nenhuma música pendente.</div>  // Caso não haja músicas pendentes
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#F9F9F9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    musicItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: '#FFF',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    musicTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    buttonGroup: {
        display: 'flex',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    rejectButton: {
        backgroundColor: '#FF5C5C',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
};

export default ApprovalList;
