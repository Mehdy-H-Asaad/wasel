"use client";
import { Form } from "@/components/ui/form";
import { useCreateCompanyInfo } from "../../hooks/useCreateCompanyInfo";

import { CompanyGeneralInfo } from "./company-general-info";
import { CompanyLocationInfo } from "./company-location-info";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { useAuthEmailOtpStore } from "../../store/auth-email-otp.store";
import { MainButton } from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CompanyInfoForm = () => {
  const router = useRouter();
  const { CreateCompanyInfoForm, onCreateCompanyInfo, isCreatingCompanyInfo } =
    useCreateCompanyInfo();

  const { step } = useAuthNextStepStore();
  const { email } = useAuthEmailOtpStore();

  useEffect(() => {
    // If no email is stored or step is less than 3, redirect to signup
    if (!email || step < 3) {
      router.replace("/signup");
    }
  }, [email, step, router]);

  // Don't render if redirecting
  if (!email || step < 3) {
    return null;
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="container max-w-7xl">
        <Form {...CreateCompanyInfoForm}>
          <form
            onSubmit={CreateCompanyInfoForm.handleSubmit(onCreateCompanyInfo)}
          >
            <div className="flex flex-col gap-6">
              {step === 3 && <CompanyGeneralInfo />}
              {step === 4 && (
                <div className="flex flex-col gap-3">
                  <CompanyLocationInfo>
                    <MainButton
                      type="submit"
                      className="w-fit"
                      disabled={
                        isCreatingCompanyInfo ||
                        !CreateCompanyInfoForm.formState.isValid
                      }
                      isLoading={isCreatingCompanyInfo}
                      loadingText="Creating company information"
                    >
                      Generate Certificate
                    </MainButton>
                  </CompanyLocationInfo>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
