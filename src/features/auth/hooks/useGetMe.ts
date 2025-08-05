import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { useAuthUserStore } from "../store/auth-user.store";

export const useGetMe = () => {
	const {} = useAuthUserStore();
	const { data, isLoading, error } = useApiQuery({
		queryKey: ["me"],
		requestURL: `/auth/me`,
		enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
		retry: false,
	});

	return { data, isLoading, error };
};
