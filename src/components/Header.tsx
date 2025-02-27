    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { isAuthenticated, isAdmin, logout } from '../utils/auth';

    const Header: React.FC = () => {
        const navigate = useNavigate();

        const handleLogout = () => {
            logout();
            setTimeout(() => {
                window.location.href = '/'; // Recarrega a página para limpar o estado
            }, 500);
        };

        return (
            <nav style={styles.nav}>
                <div style={styles.left}>
                    <Link to="/" style={styles.link}>Home</Link>
                    {isAuthenticated() && (
                        <Link to="/music/create" style={styles.link}>Adicionar Música</Link>
                    )}
                    {isAdmin() && (
                        <Link to="/admin/approval" style={styles.link}>Admin</Link>
                    )}
                </div>
                <div style={styles.right}>
                    {!isAuthenticated() ? (
                        <>
                            <Link to="/login" style={styles.link}>Login</Link>
                            <Link to="/register" style={styles.link}>Registrar</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        );
    };

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: '#1E1E2F',
            color: 'white',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        left: {
            display: 'flex',
        },
        right: {
            display: 'flex',
            alignItems: 'center',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
            fontSize: '16px',
            transition: 'color 0.3s ease',
        },
        logoutButton: {
            backgroundColor: '#FF5C5C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
        }
    };

    export default Header;
