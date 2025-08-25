import axios, { AxiosError } from "axios";
import { TAuthUserDTO } from "@/features/auth/types/auth.types";
import { useAuthUserStore } from "@/features/auth/store/auth-user.store";

export const axiosPublicClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export const axiosPrivateClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosPrivateClient.interceptors.request.use(
	config => {
		const { accessToken } = useAuthUserStore.getState();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

axiosPrivateClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;
		const { setAccessToken, resetUser, setUser } = useAuthUserStore.getState();

		// Prevent infinite retry loops
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest._isRetryRequest
		) {
			originalRequest._retry = true;

			try {
				// Use public client to avoid interceptor loop
				const { data }: { data: { data: TAuthUserDTO } } =
					await axiosPublicClient.post("/auth/refresh", {});

				setAccessToken(data.data.access_token);
				setUser(data.data.user);

				// Retry the original request with new token
				originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;
				originalRequest._isRetryRequest = true; // Mark as retry to prevent loops
				return axiosPrivateClient(originalRequest);
			} catch (refreshError) {
				// If refresh fails, clear user data and reject
				if (refreshError instanceof AxiosError) {
					if (
						refreshError.response?.status === 401 ||
						refreshError.response?.status === 403
					) {
						resetUser();
						// Redirect to login or handle as needed
						if (typeof window !== "undefined") {
							window.location.href = "/login";
						}
					}
				}
				// Don't retry again, just reject
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);
