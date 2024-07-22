import { create } from 'zustand';

const useAuthStore = create((set) => (
    {
        token: localStorage.getItem('token') || null,
        user: null,
        profile: null,
        setUser: (user) => set({ user }),
        setProfile: (profile) => set({ profile }),
        updateToken: (newToken) => {
            localStorage.setItem('token', newToken);
            set({ token: newToken });
        },
        clearAuth: () => {
            localStorage.removeItem('token');
            set({ token: null, user: null, profile: null });
        },
    }
));

export default useAuthStore;