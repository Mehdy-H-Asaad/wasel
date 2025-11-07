"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetClients } from "../../hooks/useGetClients";
import { ClientsColumns } from "./ClientsColumns";
import { MainButton } from "@/components/common/MainButton";
import { useRouter } from "next/navigation";

export const ClientsDataTable = () => {
  const router = useRouter();
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
      <MainButton
        onClick={() => router.push("/admin/contacts/clients/create-client")}
      >
        Add Client
      </MainButton>
    </DataTable>
  );
};
