import { create } from "zustand";
import { TUserDTO } from "@/features/user/schema/user.schema";

type TUseAuthUserStore = {
	user: TUserDTO | null;
	setUser: (user: TUserDTO) => void;
	resetUser: () => void;
};

export const useAuthUserStore = create<TUseAuthUserStore>()(set => ({
	user: null,
	setUser: (user: TUserDTO) => set({ user }),
	resetUser: () => {
		set({ user: null });
	},
}));
