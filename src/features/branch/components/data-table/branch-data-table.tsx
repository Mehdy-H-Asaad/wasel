"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetBranches } from "../../hooks/use-get-branches";
import { BranchColumns } from "./branch-columns";
import { MainButton } from "@/components/common/MainButton";
// import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Link from "next/link";

export const BranchDataTable = () => {
  // const router = useRouter();
  const { metaData, branches, isLoadingBranches } = useGetBranches();

  return (
    <DataTable
      columns={BranchColumns}
      data={branches || []}
      isLoading={isLoadingBranches}
      pageCount={metaData.total_pages}
      setSearchableField={() => {}}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Branch Name"
    >
      <Link href="/admin/inventory/branches/create">
        <MainButton>
          <Plus className="h-4 w-4" />
          Add Branch
        </MainButton>
      </Link>
    </DataTable>
  );
};
