import { InvoiceDetails } from "@/features/invoice/components/invoice-details/invoice-details";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
	return <InvoiceDetails id={params.id} />;
};

export default page;
