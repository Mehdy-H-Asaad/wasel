import { SectionTitle } from "@/components/common/SectionTitle";
import { SignUpForm } from "@/features/auth/components/signup-form";
import React from "react";

const SignUpPage = () => {
	return (
		<div className="flex min-h-[calc(100svh-80px)] w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm flex flex-col gap-8">
				<div className="flex items-center justify-center mb- text-center">
					<SectionTitle
						title="Get Started"
						description="Create new account with Wasel"
					/>
				</div>
				<SignUpForm />
			</div>
		</div>
	);
};

export default SignUpPage;
