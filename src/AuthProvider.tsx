import axios from "axios";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
    username: string;
    role: string;
    loginAction: (data: { username: string; password: string }) => Promise<void>;
    logoutAction: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const navigate = useNavigate();
    const loginAction = async (data: { username: string; password: string }) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
                username: data.username,
                password: data.password,
            })
            if (res.data) {
                const { token, roleName,username } = res.data;
                sessionStorage.setItem("token",token);
                setRole(roleName);
                setUsername(username)
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/isUserAuth`,{
                        headers:{
                            "x-access-token": token
                        }
                    })
                    if(response.data.auth){
                        navigate("/dashboard")
                    }   
            }
    };

    const logoutAction = () => {
        sessionStorage.removeItem("token")
        setRole('');
        setUsername('');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{username, role, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
