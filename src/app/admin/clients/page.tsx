import { Skeleton } from "@/components/ui/skeleton";
import { ClientsDataTable } from "@/features/clients/components/data-table/ClientsDataTable";
import { CLIENTS } from "@/features/clients/constants/client.constant";
import { axiosPrivateClient } from "@/shared/api/axios";
import { getQueryClient } from "@/shared/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { GrGroup } from "react-icons/gr";

const ClientsPage = async () => {
	const queryClient = getQueryClient();

	// useCustomPrefetchQuery<TClientDTO[]>({
	// 	queryKey: [CLIENTS],
	// 	requestURL: `/${CLIENTS}`,
	// 	queryClient
	// })

	await queryClient.prefetchQuery({
		queryKey: [CLIENTS],
		queryFn: async () => {
			const { data } = await axiosPrivateClient.get(`/${CLIENTS}`);
			return data;
		},
	});

	return (
		<div>
			<div className="flex items-center gap-4 py-10">
				<GrGroup size={40} />
				<div className="font-bold text-5xl">Clients</div>
			</div>
			<Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ClientsDataTable />
				</HydrationBoundary>
			</Suspense>
		</div>
	);
};

export default ClientsPage;
