"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TUserDTO } from "../../schema/user.schema";
import { UsersActionCell } from "./actions/users-action-cell";
import { Badge } from "@/components/ui/badge";

export const UsersColumns: ColumnDef<TUserDTO>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			const role = row.original.role;
			return (
				<Badge variant={role === "SUPER_ADMIN" ? "default" : "secondary"}>
					{role}
				</Badge>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			const isCompleted = row.original.is_completed;
			return (
				<Badge
					variant={
						isCompleted
							? status === "ACTIVE"
								? "default"
								: "destructive"
							: "outline"
					}
				>
					{isCompleted ? status : "PENDING"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "last_login",
		header: "Last Login",
		cell: ({ row }) => {
			const lastLogin = row.original.last_login;
			return lastLogin ? new Date(lastLogin).toLocaleDateString() : "Never";
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <UsersActionCell row={row} />;
		},
	},
];
