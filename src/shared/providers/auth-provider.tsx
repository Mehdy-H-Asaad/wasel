"use client";
import { useGetMe } from "@/features/auth/hooks/useGetMe";
import React from "react";

export const AuthProvider = ({
	children,
	enabled,
}: {
	children: React.ReactNode;
	enabled: boolean;
}) => {
	const {} = useGetMe({ enabled });

	return <>{children}</>;
};
