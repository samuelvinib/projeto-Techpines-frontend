export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'));
};

export const isAdmin = () => {
    try {
        const role = localStorage.getItem('role');

        if (!role) {
            console.warn('Nenhuma role encontrada no localStorage.');
            return false;
        }

        const parsedRole = JSON.parse(role); // Se role estiver como JSON, parseamos
        console.log('Role do usuário:', parsedRole);

        return parsedRole === 'admin'; // Confirma se é 'admin'
    } catch (error) {
        console.error('Erro ao verificar o papel do usuário:', error);
        return false
    }
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "/login"; // Redireciona para a página de login após logout
};
