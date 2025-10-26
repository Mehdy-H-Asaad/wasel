"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IoRocketOutline, IoCheckmarkCircle } from "react-icons/io5";

export function UpgradePlanCard() {
	const features = [
		"Unlimited invoices",
		"Advanced analytics",
		"Priority support",
		"Custom branding",
	];

	return (
		<Card className="relative overflow-hidden border-none bg-gradient-to-br from-main-green via-secondary-green to-main-green dark:from-main-green/90 dark:to-secondary-green/90">
			{/* Decorative circles */}
			<div className="absolute -top-10 -right-10 w-40 h-40 bg-light-green/20 rounded-full blur-3xl" />
			<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-light-green/20 rounded-full blur-3xl" />

			<div className="relative px-6 py-6 text-white">
				<div className="flex items-start justify-between mb-4">
					<div>
						<div className="inline-flex items-center gap-2 mb-3">
							<IoRocketOutline className="text-3xl text-light-green" />
							<span className="text-xs font-semibold bg-light-green/20 px-3 py-1 rounded-full">
								PRO
							</span>
						</div>
						<h3 className="text-2xl font-bold mb-2">Upgrade Your Plan</h3>
						<p className="text-white/80 text-sm mb-6">
							Unlock premium features and take your business to the next level
						</p>
					</div>
				</div>

				<div className="space-y-2.5 mb-6">
					{features.map((feature, index) => (
						<div key={index} className="flex items-center gap-2.5">
							<IoCheckmarkCircle className="text-light-green text-lg shrink-0" />
							<span className="text-sm text-white/90">{feature}</span>
						</div>
					))}
				</div>

				<Button className="w-full bg-white hover:bg-white/90 text-main-green font-semibold shadow-lg">
					Upgrade Now
				</Button>
			</div>
		</Card>
	);
}
