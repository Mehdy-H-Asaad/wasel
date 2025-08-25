import { create } from "zustand";
import { TUserDTO } from "../types/auth.types";

type TUseAuthUserStore = {
	accessToken: string;
	setAccessToken: (access_token: string) => void;
	user: TUserDTO | null;
	setUser: (user: TUserDTO) => void;
	resetUser: () => void;
};

export const useAuthUserStore = create<TUseAuthUserStore>()(set => ({
	accessToken:
		(typeof window !== "undefined" && localStorage.getItem("access_token")) ||
		"",
	user: null,
	setUser: (user: TUserDTO) => set({ user }),
	setAccessToken: accessToken => {
		if (accessToken) {
			localStorage.setItem("access_token", accessToken);
		}
		set({ accessToken });
	},
	resetUser: () => {
		localStorage.removeItem("access_token");
		set({ accessToken: "", user: null });
	},
}));
