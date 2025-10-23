"use client";

import { MainButton } from "@/components/common/MainButton";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const SubscribeBanner = () => {
	const benefits = [
		"ZATCA-compliant invoicing",
		"Real-time analytics",
		"Secure payment processing",
		"24/7 support",
	];

	return (
		<div className="w-full py-32 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1f1a] to-[#121212]" />

			{/* Animated grid */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

			{/* Gradient orbs */}
			<motion.div
				className="absolute top-0 left-1/4 w-96 h-96 bg-main-green/20 rounded-full blur-3xl"
				animate={{
					scale: [1, 1.3, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
				animate={{
					scale: [1.3, 1, 1.3],
					opacity: [0.2, 0.4, 0.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<div className="container relative">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="relative max-w-5xl mx-auto"
				>
					{/* Glow effect */}
					<div className="absolute -inset-8 bg-gradient-to-r from-main-green/20 via-emerald-500/20 to-main-green/20 rounded-3xl blur-3xl opacity-50" />

					{/* Main container */}
					<div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-3xl border border-gray-800 p-12 md:p-16 overflow-hidden">
						{/* Background pattern */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-main-green/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

						<div className="relative flex flex-col gap-8 text-center justify-center items-center">
							{/* Badge */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-green/10 border border-main-green/20"
							>
								<span className="text-sm font-medium text-main-green">
									Join 1000+ businesses in KSA
								</span>
							</motion.div>

							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
								className="font-bold text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-tight"
							>
								Join now and become a member of{" "}
								<span className="bg-gradient-to-r from-main-green via-emerald-400 to-main-green bg-clip-text text-transparent">
									Faotarah family
								</span>
							</motion.h2>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4 }}
								className="text-xl text-gray-400 max-w-2xl"
							>
								Receive payments and collect your invoices with ease. Start
								growing your business today.
							</motion.p>

							{/* Benefits grid */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.5 }}
								className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-4"
							>
								{benefits.map((benefit, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: 0.6 + index * 0.1 }}
										className="flex items-center gap-2 text-left"
									>
										<CheckCircle2 className="w-5 h-5 text-main-green flex-shrink-0" />
										<span className="text-gray-300">{benefit}</span>
									</motion.div>
								))}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.7 }}
								className="mt-4"
							>
								<Link href={"/login"}>
									<MainButton className="group px-10 py-7 text-xl">
										<span className="flex items-center gap-2">
											Subscribe Now
											<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
										</span>
									</MainButton>
								</Link>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
