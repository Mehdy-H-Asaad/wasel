"use client";
import { DataTable } from "@/components/common/DataTable";

import { useGetClients } from "../../hooks/useGetClients";
import { ClientsColumns } from "./ClientsColumns";
import { CreateClient } from "../CreateClient";

export const ClientsDataTable = () => {
  const { metaData, clients, isLoadingClients } = useGetClients();

  return (
    <DataTable
      columns={ClientsColumns}
      data={clients || []}
      isLoading={isLoadingClients}
      pageCount={metaData.total_pages}
      setSearchableField={() => {}}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Compnay - Client"
    >
      <CreateClient />
    </DataTable>
  );
};
