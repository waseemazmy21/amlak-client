'use client';

import { createContext, ReactNode, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/lib/types';
import { getUser } from '@/service/auth';

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: unknown;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [hydrated, setHydrated] = useState(false);

    // Ensure this only runs on client to avoid SSR null flash
    useEffect(() => {
        setHydrated(true);
    }, []);

    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await getUser()
            return res.data.data.user as User
        },
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
        enabled: hydrated, // don't fetch until mounted on client
    });

    const loading = !hydrated || isLoading;

    return (
        <AuthContext.Provider
            value={{
                user: user || null,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
