"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetBranches } from "../../hooks/use-get-branches";
import { BranchColumns } from "./branch-columns";
import { MainButton } from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export const BranchDataTable = () => {
  const router = useRouter();
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
      <MainButton
        onClick={() => router.push("/admin/inventory/branches/create")}
      >
        <Plus className="h-4 w-4" />
        Add Branch
      </MainButton>
    </DataTable>
  );
};
