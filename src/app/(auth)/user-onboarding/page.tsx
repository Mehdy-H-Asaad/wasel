import { AcceptInvitationForm } from "@/features/auth/components/accept-invitation";
import React, { Suspense } from "react";
import TopLoadingBar from "@/components/common/TopLoadingBar";

const page = () => {
  return (
    <Suspense fallback={<TopLoadingBar />}>
      <AcceptInvitationForm />
    </Suspense>
  );
};

export default page;
