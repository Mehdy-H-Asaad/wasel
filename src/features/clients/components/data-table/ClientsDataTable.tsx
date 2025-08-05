"use client";
import { DataTable } from "@/components/common/DataTable";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { LIMIT } from "@/shared/data/constants";
import { useGetClients } from "../../hooks/useGetClients";
import { ClientsColumns } from "./ClientsColumns";
import { CreateClient } from "../CreateClient";
import { TClientDTO } from "../../types/client.types";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";

export const ClientsDataTable = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: LIMIT,
	});

	const { metaData } = useGetClients();

	const data: TClientDTO[] = [
		{
			id: 1,
			PartyIdentification: {
				schemeID: "CRN",
				value: "4030202388",
			},
			Country: "SA",
			StreetName: "شارع ام القرى",
			BuildingNumber: "7987",
			CitySubdivisionName: "حي الصفا",
			CityName: "جدة",
			PostalZone: "23456",
			CompanyID: "300828213600003",
			RegistrationName: "مؤسسة باص السعادة للنقليات",
			email: "example@gmail.com",
			phone: "+971507725069",
		},
	];

	return false ? (
		<DataTableSkeleton />
	) : (
		<div className=" border-3 p-10 rounded-lg border-[#171717] dark:bg-main-black">
			<DataTable
				columns={ClientsColumns}
				data={data || []}
				pageCount={metaData.total_pages}
				pagination={pagination}
				searchableField="RegistrationName"
				searchablePlaceholder="Compnay - Client"
				setPagination={setPagination}
				skeletonRows={10}
			>
				<CreateClient />
			</DataTable>
		</div>
	);
};
