import { AdminSidebar } from "@/features/admin/components/layout/admin-sidebar";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AdminSidebar>
				<div className="container max-w-7xl mx-auto">{children}</div>
			</AdminSidebar>
		</>
	);
}
