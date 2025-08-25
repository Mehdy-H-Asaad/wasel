"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { LOGIN_QUERY_KEY } from "../constants/auth.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../schema/auth.schema";
import { z } from "zod";
import { TAuthUserDTO } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "../store/auth-user.store";

export const useLogin = () => {
	const router = useRouter();
	const { setAccessToken, setUser } = useAuthUserStore();
	const { mutate, isPending } = useApiMutation<TAuthUserDTO, TLoginDTO>({
		axiosRequestMethod: "post",
		queryKey: [LOGIN_QUERY_KEY],
		requestURL: `/auth/login`,
		successMsg: "Login successful",
		axiosType: "public",
		onSuccess: data => {
			router.push("/admin");
			setAccessToken(data.data.access_token);
			setUser(data.data.user);
		},
	});

	const loginSchema = authSchema.pick({
		email: true,
		password: true,
	});

	type TLoginDTO = z.infer<typeof loginSchema>;

	const LoginForm = useForm<TLoginDTO>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = (values: TLoginDTO) => {
		mutate(values);
	};

	return {
		LoginForm,
		onLogin,
		isLoginPending: isPending,
	};
};
