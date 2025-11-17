import { SignUpForm } from "@/features/auth/components/signup-form";
import { SignupBenefits } from "@/features/auth/components/signup-benefits";
import React from "react";

const SignUpPage = () => {
	return (
		<div className="min-h-[calc(100svh-80px)] w-full">
			<div className="flex flex-col lg:flex-row min-h-[calc(100svh)]">
				<div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-10">
					<div className="w-full max-w-md flex flex-col gap-6">
						<SignUpForm />
					</div>
				</div>

				<div className="hidden lg:flex lg:items-center flex-1 bg-gradient-to-br from-muted/40 to-muted/20 border-l">
					<div className="w-full max-w-lg mx-auto">
						<SignupBenefits />
					</div>
				</div>
			</div>

			<div className="lg:hidden py-8 px-6 md:px-8 bg-gradient-to-br from-muted/40 to-muted/20 border-t">
				<div className="max-w-2xl mx-auto">
					<SignupBenefits />
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
