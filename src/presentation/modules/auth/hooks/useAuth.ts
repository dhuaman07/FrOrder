import { clearAuthStorage, getAuthHeader } from "@/src/application/auth/helpers/token.helper";
import { IUser } from "@/src/core/interfaces/user/user.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const token = localStorage.getItem('accessToken');
            const userJson = localStorage.getItem('user');
            const expirationString = localStorage.getItem('tokenExpiration');

            if (token && userJson && expirationString) {
                const expirationTime = parseInt(expirationString);
                const now = Date.now();

                if (now < expirationTime) {
                    const parsedUser = JSON.parse(userJson);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    logout();
                }
            } else {
                logout();                                
            }
        } catch (error) {           
            logout();
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
        setUser(null);
        setIsAuthenticated(false);
        router.push('/login');
    };

    const updateUser = (newUser: IUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const getToken = (): string | null => {
        return localStorage.getItem('accessToken');
    };

    return {
        user,
        isAuthenticated,
        loading,
        logout,
        updateUser,
        checkAuth,
        getToken,
        getAuthHeader,
        clearAuthStorage
    };
}