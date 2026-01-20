"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetProjects } from "../../hooks/use-get-projects";
import { ProjectColumns } from "./project-columns";
import { ProjectFilters, TProjectFilters } from "./project-filters";
import { CreateProjectDialog } from "../create-project-dialog";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
export const ProjectDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams, clearFilters } =
    useFilterParams<TProjectFilters>();


  const filters: TProjectFilters = {
    name: searchParams.get("name") ?? undefined,
    customer_id: searchParams.get("customer_id") ?? undefined,
    status: searchParams.get("status") ?? undefined,

  };

  const { metaData, projects, isLoadingProjects } = useGetProjects({
    filters: {
      ...filters,
      name: searchParams.get("name") ?? undefined,
    },
  });

  const handleSearchableFieldChange = (name: string) => {
    updateFilterParams({ name });
  };

  const handleFiltersChange = (newFilters: Partial<TProjectFilters>) => {
    updateFilterParams(newFilters, { resetPage: true });
  };




  return (

    <DataTable
      columns={ProjectColumns}
      data={projects || []}
      isLoading={isLoadingProjects}
      pageCount={metaData.total_pages}
      setSearchableField={handleSearchableFieldChange}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Search by project name"
      filters={<ProjectFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={clearFilters}
      />}
    >
      <CreateProjectDialog />

    </DataTable>
  );
};
