import { AdminHeader } from "@/features/admin/components/layout/AdminHeader";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AdminHeader />
			<div className="container ">{children}</div>
		</>
	);
}
