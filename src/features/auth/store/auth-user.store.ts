import { create } from "zustand";

type TUseAuthUserStore = {
	accessToken: string;
	setAccessToken: (access_token: string) => void;
	resetUser: () => void;
};

export const useAuthUserStore = create<TUseAuthUserStore>()(set => ({
	accessToken: "",
	setAccessToken: accessToken => {
		if (accessToken) {
			localStorage.setItem("access_token", accessToken);
		}
		set({ accessToken });
	},
	resetUser: () => {
		localStorage.removeItem("access_token");
		set({ accessToken: "" });
	},
}));
