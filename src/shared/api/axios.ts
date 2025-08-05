import axios, { AxiosError } from "axios";
import { TAuthResponseDTO } from "@/features/auth/types/auth.types";
import { useAuthUserStore } from "@/features/auth/store/auth-user.store";

export const axiosPublicClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	config => {
		const { accessToken } = useAuthUserStore.getState();
		console.log(accessToken);

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	response => response,
	async error => {
		const { setAccessToken, resetUser } = useAuthUserStore.getState();
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { data }: { data: Omit<TAuthResponseDTO, "refresh_token"> } =
					await axiosClient.post("/auth/refresh-token", {});

				const { access_token } = data;
				setAccessToken(access_token);
				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				return axiosClient(originalRequest);
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status === 403) {
					resetUser();
					return;
				}
			}
		}

		return Promise.reject(error);
	}
);
