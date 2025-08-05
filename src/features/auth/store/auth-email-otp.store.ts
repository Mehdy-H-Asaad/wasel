import { create } from "zustand";

export const useAuthEmailOtpStore = create<{
	email: string;
	setEmail: (email: string) => void;
}>(set => ({
	email: "",
	setEmail: email => set({ email }),
}));
