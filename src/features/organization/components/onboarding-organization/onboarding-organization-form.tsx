"use client";

import { useState } from "react";
import { useOnboardOrganization } from "../../hooks/use-onboard-organization";
import { Form } from "@/components/ui/form";
import { MainButton } from "@/components/common/MainButton";
import { OrganizationInfoStep } from "./organization-info-step";
import { OrganizationAddressStep } from "./organization-address-step";
import { cn } from "@/lib/utils";
import { CheckCircle2, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OnboardingOrganizationForm = () => {
  const {
    CreateOrganizationForm,
    onCreateOrganization,
    isCreatingOrganization,
  } = useOnboardOrganization();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const handleNext = async () => {
    const fieldsToValidate =
      currentStep === 1
        ? ([
            "name",
            "email",
            "country_code",
            "vat_number",
            "business_category",
            "tax_scheme",
            "phone",
          ] as const)
        : ([
            "street",
            "building_number",
            "division",
            "city",
            "postal_code",
            "address",
          ] as const);

    const isValid = await CreateOrganizationForm.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 2) {
      CreateOrganizationForm.handleSubmit(onCreateOrganization)();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Side - Design Section */}
      <div className="flex flex-1 bg-gradient-to-br from-main-green via-secondary-green to-main-green items-center justify-center p-6 md:p-8 lg:p-12 relative overflow-hidden min-h-[300px] lg:min-h-screen">
        <div className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain"></div>
        <div className="relative z-10 max-w-md text-white space-y-6 lg:space-y-8">
          <div className="space-y-3 lg:space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Just a few clicks left to join!
            </h2>
            <p className="text-base lg:text-lg text-green-100">
              Complete your organization setup and start managing your business
              with Wasel.
            </p>
          </div>

          <div className="space-y-4 pt-6 lg:pt-8">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all shrink-0",
                  currentStep >= 1
                    ? "bg-white text-main-green border-white"
                    : "border-white/50 text-white/50"
                )}
              >
                {currentStep > 1 ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm lg:text-base",
                    currentStep >= 1 ? "text-white" : "text-white/70"
                  )}
                >
                  Organization Information
                </p>
                <p className="text-xs lg:text-sm text-green-100/80">
                  Basic details about your business
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all shrink-0",
                  currentStep >= 2
                    ? "bg-white text-main-green border-white"
                    : "border-white/50 text-white/50"
                )}
              >
                {currentStep === 2 ? (
                  <MapPin className="w-5 h-5" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white/50" />
                )}
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm lg:text-base",
                    currentStep >= 2 ? "text-white" : "text-white/70"
                  )}
                >
                  Address Details
                </p>
                <p className="text-xs lg:text-sm text-green-100/80">
                  Your business location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-2xl py-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Complete Your Setup
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              {currentStep === 1
                ? "Tell us about your organization"
                : "Where is your business located?"}
            </p>
          </div>

          <Form {...CreateOrganizationForm}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && <OrganizationInfoStep />}
              {currentStep === 2 && <OrganizationAddressStep />}

              <div className="flex items-center justify-between pt-6">
                {currentStep === 2 && (
                  <MainButton
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isCreatingOrganization}
                    className="min-w-[100px]"
                  >
                    Back
                  </MainButton>
                )}
                <div
                  className={cn(
                    "flex gap-3",
                    currentStep === 1 ? "ml-auto" : "ml-auto"
                  )}
                >
                  {currentStep === 1 ? (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleNext}
                      className="min-w-[120px]"
                    >
                      Continue
                    </Button>
                  ) : (
                    <MainButton
                      type="submit"
                      isLoading={isCreatingOrganization}
                      loadingText="Completing setup..."
                      disabled={isCreatingOrganization}
                      className="min-w-[120px]"
                    >
                      Complete Setup
                    </MainButton>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
