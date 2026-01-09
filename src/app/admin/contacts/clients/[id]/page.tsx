import { UpdateClient } from "@/features/clients/components/UpdateClient";
import React from "react";

const UpdateClientPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <UpdateClient clientId={id} />;
};

export default UpdateClientPage;
