export const getAuthHeader = (): string | null => {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';

    return token ? `${tokenType} ${token}` : null;
};

export const clearAuthStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');

};

export const isTokenExpired = () : boolean => {
    const token = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');
    const expirationString = localStorage.getItem('tokenExpiration');

    if (token && userJson && expirationString) {
        const expirationTime = parseInt(expirationString);
        const now = Date.now();

        if (now < expirationTime) {
            return false
        } else {
            return true;
        }
    } else {
        return true;
    }
};