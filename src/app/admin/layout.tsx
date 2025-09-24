import { AppSidebar } from "@/features/admin/components/layout/app-side-bar";
import {} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/components/common/dynamic-breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="w-full max-w-full md:max-w-[calc(100%-16rem)] ">
				<header className="mb-10 flex h-16 shrink-0 items-center border-b border-gray-600 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex justify-between px-4 w-full">
						<div className="flex items-center gap-2">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<DynamicBreadcrumb />
						</div>
						<ThemeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
