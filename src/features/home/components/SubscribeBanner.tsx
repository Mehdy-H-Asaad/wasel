import { MainButton } from "@/components/common/MainButton";

export const SubscribeBanner = () => {
	return (
		<div className="w-full min-h-[30rem] flex items-center justify-center subscribe-banner-bg py-20 bg-gradient-to-r from-[#121212] via-[#121212] to-main-green">
			<div className="container relative">
				<div className="flex flex-col gap-3 max-w-[45rem] mx-auto text-center justify-center items-center capitalize">
					<div className="font-bold text-5xl">
						Join now and become a member of Faotarah family
					</div>
					<p className="text-lg">
						Receive payments and collect your invoices with ease
					</p>

					<MainButton className="mt-4">Subscribe Now</MainButton>
				</div>
			</div>
		</div>
	);
};
