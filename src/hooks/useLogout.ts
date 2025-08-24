'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutService } from '@/service/auth';

export function useLogout() {
    const queryClient = useQueryClient();

    const {
        mutateAsync: logout,
        isPending,
        error,
    } = useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    return {
        logout,
        isPending,
        error,
    };
}
