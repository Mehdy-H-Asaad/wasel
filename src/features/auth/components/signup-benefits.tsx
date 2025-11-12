"use client";

import React from "react";
import { CheckCircle2, Shield, Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
	{
		icon: Shield,
		title: "Secure & Trusted",
		description: "Bank-level encryption to protect your data",
	},
	{
		icon: Zap,
		title: "Instant Processing",
		description: "Fast and efficient invoice processing",
	},
	{
		icon: Lock,
		title: "Privacy First",
		description: "Your data is never shared with third parties",
	},

	{
		icon: CheckCircle2,
		title: "24/7 Support",
		description: "Round-the-clock customer support",
	},
];

export function SignupBenefits({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-center gap-6 p-8 lg:p-10",
				className
			)}
			{...props}
		>
			{/* Decorative background elements */}
			<div className="absolute top-0 right-0 w-72 h-72 bg-main-green/5 rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 left-0 w-72 h-72 bg-light-green/5 rounded-full blur-3xl -z-10" />

			<div className="relative space-y-3">
				<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Why choose{" "}
					<span className="text-main-green dark:text-light-green">Wasel</span> ?
				</h2>
				<p className="text-base text-muted-foreground">
					Join us to enjoy Wasel for your invoicing and payment needs
				</p>
			</div>

			<div className="relative space-y-3">
				{benefits.map((benefit, index) => {
					const Icon = benefit.icon;
					return (
						<div
							key={index}
							className="group flex items-start gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors"
						>
							<div className="flex-shrink-0 mt-0.5">
								<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-main-green/10 border border-main-green/20 group-hover:bg-main-green/20  transition-all duration-300">
									<Icon className="w-5 h-5 text-main-green dark:text-light-green" />
								</div>
							</div>
							<div className="flex-1 space-y-1">
								<h3 className="font-semibold text-sm group-hover:text-main-green dark:text-light-green transition-colors">
									{benefit.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{benefit.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
