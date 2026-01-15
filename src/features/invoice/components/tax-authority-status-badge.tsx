import { Badge } from "@/components/ui/badge";
import { ETaxAuthorityStatus } from "../schema/invoice.schema";
import React from "react";

export const TaxAuthorityStatusBadge = ({
	status,
}: {
	status: ETaxAuthorityStatus;
}) => {
	const statusBadgeColor =
		ETaxAuthorityStatus[status] === ETaxAuthorityStatus.ACCEPTED
			? "bg-green-700 text-white border-green-700"
			: ETaxAuthorityStatus[status] === ETaxAuthorityStatus.ACCEPTED_WITH_WARNINGS
			? "bg-yellow-700 text-white border-yellow-700"
			: ETaxAuthorityStatus[status] === ETaxAuthorityStatus.REJECTED
			? "bg-red-700 text-white border-red-700"
			: "bg-gray-700 text-white border-gray-700"; // NOT_SENT

	return (
		<Badge className={statusBadgeColor}>{status.split("_").join(" ")}</Badge>
	);
};
