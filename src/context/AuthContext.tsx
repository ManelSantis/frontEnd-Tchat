import { decodeJwt } from 'jose';
import { createContext } from 'react';

export type AuthContextType = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    authenticationType: []
    expires_in: number;
    scope: string;
    userId: string;
    user: unknown;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const authData = JSON.parse(localStorage.getItem('authData') ?? '{}');
   
    if (authData.access_token) {
        authData.user = decodeJwt(authData.access_token);
    }
   
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}