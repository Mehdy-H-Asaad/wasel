import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "../store/auth-user.store";

export const useLogout = () => {
	const router = useRouter();
	const { resetUser } = useAuthUserStore();
	const { mutate, isPending } = useApiMutation<void, void>({
		axiosRequestMethod: "post",
		requestURL: "/auth/logout",
		successMsg: "Logout successful",
		axiosType: "private",
		queryKey: ["logout"],
		onSuccess: () => {
			resetUser();
			router.replace("/login");
		},
	});

	const onLogout = () => mutate();

	return { onLogout, isLogoutPending: isPending };
};
