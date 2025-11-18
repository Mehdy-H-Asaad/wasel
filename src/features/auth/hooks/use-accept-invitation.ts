"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { ACCEPT_INVITATION_QUERY_KEY } from "../constants/auth.constants";
import {
	AcceptInvitationSchema,
	TAcceptInvitationDTO,
} from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TAuthUserDTO } from "../types/auth.types";
import { useAuthUserStore } from "../store/auth-user.store";

export const useAcceptInvitation = () => {
	const router = useRouter();
	const { setUser } = useAuthUserStore();

	const { mutate, isPending } = useApiMutation<
		TAuthUserDTO,
		TAcceptInvitationDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [ACCEPT_INVITATION_QUERY_KEY],
		requestURL: `/auth/invitations/accept`,
		successMsg: "Invitation accepted successfully",
		axiosType: "public",
		onSuccess: data => {
			setUser(data.data.user);
			router.push("/login");
		},
	});

	const AcceptInvitationForm = useForm<TAcceptInvitationDTO>({
		resolver: zodResolver(AcceptInvitationSchema),
		defaultValues: {
			token: "",
			password: "",
			confirm_password: "",
		},
	});

	const onAcceptInvitation = (values: TAcceptInvitationDTO) => {
		mutate(values);
	};

	return {
		AcceptInvitationForm,
		onAcceptInvitation,
		isAcceptingInvitation: isPending,
	};
};
