"use client";

import * as React from "react";
import { Box, ChartLine, ClipboardMinus, FileText, Users } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},

	navMain: [
		{
			title: "Analytics",
			url: "/admin",
			icon: ChartLine,
			isActive: true,
		},
		{
			title: "Invoices",
			url: "/admin/invoices",
			icon: FileText,
		},
		{
			title: "Clients",
			url: "/admin/clients",
			icon: Users,
		},
		{
			title: "Stock",
			url: "/admin/stock",
			icon: Box,
		},
		{
			title: "Purchase invoices",
			url: "/admin/purchase-invoices",
			icon: FileText,
		},
		{
			title: "Receipt Voucher",
			url: "/admin/purchase-invoices",
			icon: ClipboardMinus,
		},

		{
			title: "Payments Voucher",
			url: "/admin/purchase-invoices",
			icon: FileText,
		},
		{
			title: "Suppliers",
			url: "/admin/suppliers",
			icon: Users,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="text-2xl px-4 py-2 font-bold">Wasel</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
