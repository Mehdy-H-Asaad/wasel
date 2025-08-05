import { SectionTitle } from "@/components/common/SectionTitle";
import { LoginForm } from "@/features/auth/components/login-form";

const LoginPage = () => {
	return (
		<div className="flex min-h-[calc(100svh-80px)] w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm flex flex-col gap-8">
				<div className="flex items-center justify-center mb- text-center">
					<SectionTitle
						title="Welcome Again"
						description="Login to your account"
					/>
				</div>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
