import { Badge } from "@/components/ui/badge";
import { EINVOICE_STATUS } from "../schema/invoice.schema";
import React from "react";

export const InvoiceStatusBadge = ({ status }: { status: EINVOICE_STATUS }) => {
	const statusBadgeColor =
		EINVOICE_STATUS[status] === EINVOICE_STATUS.ISSUED
			? "bg-blue-700 text-white border-blue-700"
			: EINVOICE_STATUS[status] === EINVOICE_STATUS.DRAFT
			? "bg-orange-700 text-white border-orange-700"
			: EINVOICE_STATUS[status] === EINVOICE_STATUS.PARTIALLY_PAID
			? "bg-yellow-700 text-white border-yellow-700"
			: EINVOICE_STATUS[status] === EINVOICE_STATUS.PAID
			? "bg-green-700 text-white border-green-700"
			: EINVOICE_STATUS[status] === EINVOICE_STATUS.OVERDUE
			? "bg-red-700 text-white border-red-700"
			: "bg-gray-700 text-white border-gray-700";
	return (
		<Badge className={statusBadgeColor}>{status.split("_").join(" ")}</Badge>
	);
};
