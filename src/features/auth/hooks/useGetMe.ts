"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { useAuthUserStore } from "../store/auth-user.store";
import { useEffect } from "react";
import { TAuthUserDTO } from "../types/auth.types";

export const useGetMe = ({ enabled }: { enabled: boolean }) => {
	const { setUser } = useAuthUserStore();
	const { data, isLoading, error } = useApiQuery<TAuthUserDTO>({
		queryKey: ["me"],
		requestURL: `/auth/me`,
		enabled,
		retry: false,
		axiosType: "private",
	});

	useEffect(() => {
		if (data) {
			setUser(data.user);
		}
	}, [data]);

	return { data, isLoading, error };
};
