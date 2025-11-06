"use client";

import * as React from "react";
import {
  BarChart,
  Box,
  Calculator,
  ChartLine,
  DollarSign,
  FileText,
  Settings,
  Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
      title: "Reports",
      url: "/admin/reports",
      icon: BarChart,
    },
    {
      title: "Sales",
      icon: FileText,
      children: [
        {
          title: "Sale Invoices",
          url: "/admin/sales/invoices",
          canAddShortcut: true,
          shortCutLink: "/admin/sales/invoices/create-tax-invoice",
        },
        {
          title: "Cash Invoices",
          url: "/admin/sales/cash-invoices",
          canAddShortcut: true,
          shortCutLink: "/admin/sales/invoices/create-simplified-tax-invoice",
        },
        {
          title: "Quotations",
          url: "/admin/sales/quotations",
          canAddShortcut: true,
          shortCutLink: "/admin/sales/quotations/create-quotation",
        },
        {
          title: "Recurring Invoices",
          url: "/admin/sales/recurring-invoices",
          canAddShortcut: true,
        },
      ],
    },
    {
      title: "Purchases",
      icon: DollarSign,
      children: [
        {
          title: "Purchase Invoices",
          url: "/admin/purchases/purchase-invoices",
          canAddShortcut: true,
          shortCutLink:
            "/admin/purchases/purchase-invoices/create-purchase-invoice",
        },
        {
          title: "Debit Notes",
          url: "/admin/purchases/debit-notes",
          canAddShortcut: true,
        },
      ],
    },
    {
      title: "Contacts",
      icon: Users,
      children: [
        {
          title: "Customers",
          url: "/admin/contacts/customers",
          canAddShortcut: true,
        },
        {
          title: "Suppliers",
          url: "/admin/contacts/suppliers",
          canAddShortcut: true,
        },
        {
          title: "Vendors",
          url: "/admin/contacts/vendors",
          canAddShortcut: true,
        },
      ],
    },
    {
      title: "Inventory",
      icon: Box,
      children: [
        {
          title: "Items",
          url: "/admin/inventory/items",
          canAddShortcut: true,
        },
        {
          title: "Warehouses",
          url: "/admin/inventory/warehouses",
          canAddShortcut: true,
        },
      ],
    },

    {
      title: "Accounting",
      icon: Calculator,
      children: [
        {
          title: "Chart of Accounts",
          url: "/admin/accounts/chart-of-accounts",
          canAddShortcut: true,
        },
        {
          title: "Journal Entries",
          url: "/admin/accounts/journal-entries",
          canAddShortcut: true,
        },
        {
          title: "Reconciliation",
          url: "/admin/accounts/reconciliation",
          canAddShortcut: true,
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      children: [
        {
          title: "General Settings",
          url: "/admin/settings/general",
          canAddShortcut: true,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="text-2xl  font-bold">Wasel</div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
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
