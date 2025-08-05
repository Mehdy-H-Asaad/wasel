import { create } from "zustand";

type TAuthNextStepStore = {
	step: number;
	setStep: (step: number) => void;
};

export const useAuthNextStepStore = create<TAuthNextStepStore>(set => ({
	step: 1,
	setStep: step => set({ step }),
}));
