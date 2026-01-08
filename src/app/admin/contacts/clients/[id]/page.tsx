import { UpdateClient } from "@/features/clients/components/UpdateClient";
import React from "react";

const UpdateClientPage = ({ params }: { params: { id: string } }) => {
  return <UpdateClient clientId={params.id} />;
};

export default UpdateClientPage;
