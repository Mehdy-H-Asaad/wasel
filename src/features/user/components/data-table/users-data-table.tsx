"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetUsers } from "../../hooks/use-get-users";
import { UsersColumns } from "./users-columns";
import { InviteUserDialog } from "../invite-user/invite-user-dialog";
import { TUserFilters } from "../../hooks/use-get-users";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
import { USER_ROLES } from "../../constants/user.constants";
import { USER_STATUS } from "../../schema/user.schema";
import { UserFilters } from "./user-filters";

export const UsersDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams, clearFilters } =
    useFilterParams<TUserFilters>();

  const filters: TUserFilters = {
    name: searchParams.get("name") ?? undefined,
    email: searchParams.get("email") ?? undefined,
    phone: searchParams.get("phone") ?? undefined,
    role: (searchParams.get("role") as USER_ROLES) ?? undefined,
    status: (searchParams.get("status") as USER_STATUS) ?? undefined,
  };

  const handleSearchableFieldChange = (newSearchableField: string) => {
    updateFilterParams({ name: newSearchableField });
  };

  const { users, isLoadingUsers, metaData } = useGetUsers({ filters });
  return (
    <DataTable
      columns={UsersColumns}
      data={users || []}
      isLoading={isLoadingUsers}
      pageCount={metaData.total_pages}
      searchablePlaceholder="Search by Name"
      setSearchableField={handleSearchableFieldChange}
      manualPagination={true}
      totalCount={metaData.total_rows}
      filters={
        <UserFilters
          filters={filters}
          onFiltersChange={updateFilterParams}
          onClearFilters={clearFilters}
        />
      }
    >
      <InviteUserDialog />
    </DataTable>
  );
};
