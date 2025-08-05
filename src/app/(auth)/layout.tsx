import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Faotarah Login",
	description: "Login to your faotarah account",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
