"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetUsers } from "../../hooks/use-get-users";
import { UsersColumns } from "./users-columns";
import { InviteUserDialog } from "../invite-user/invite-user-dialog";

export const UsersDataTable = () => {
	const { users, isLoadingUsers, metaData } = useGetUsers();

	return (
		<DataTable
			columns={UsersColumns}
			data={users || []}
			isLoading={isLoadingUsers}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Search by name or email"
			setSearchableField={() => {}}
			manualPagination={true}
			totalCount={metaData.total_rows}
		>
			<InviteUserDialog />
		</DataTable>
	);
};
