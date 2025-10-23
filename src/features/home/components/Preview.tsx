"use client";

import Image from "next/image";
import FirstImg from "../../../../public/assets/imgs/undraw_credit-card_t6qm.svg";
import SecondImg from "../../../../public/assets/imgs/undraw_online-banking_l9sn.svg";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Shield, Zap } from "lucide-react";

export const Preview = () => {
	const features1 = [
		{ icon: <Shield className="w-5 h-5" />, text: "Sharia-compliant" },
		{ icon: <Zap className="w-5 h-5" />, text: "Instant processing" },
		{
			icon: <CheckCircle2 className="w-5 h-5" />,
			text: "Multiple payment methods",
		},
	];

	const features2 = [
		{ icon: <TrendingUp className="w-5 h-5" />, text: "Real-time analytics" },
		{
			icon: <CheckCircle2 className="w-5 h-5" />,
			text: "Comprehensive reports",
		},
		{ icon: <Shield className="w-5 h-5" />, text: "Secure dashboard" },
	];

	return (
		<div id="preview" className="py-20 relative">
			<div className="container flex flex-col gap-32">
				{/* First Section */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="flex items-center justify-center gap-20 flex-col lg:flex-row"
				>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative flex-1 max-w-xl"
					>
						<div className="absolute -inset-4 bg-gradient-to-r from-main-green/20 to-transparent rounded-3xl blur-2xl" />
						<div className="relative p-8 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-3xl border border-gray-800">
							<Image
								src={FirstImg}
								alt="Payment Processing"
								className="w-full h-auto"
								width={480}
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-col gap-6 max-w-xl flex-1"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-green/10 border border-main-green/20 w-fit">
							<span className="text-sm font-medium text-light-green">
								Payment Solutions
							</span>
						</div>

						<h2 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Accept Online Payments in Saudi Arabia with Fast, Secure and Easy
							steps
						</h2>

						<p className="text-lg text-gray-400 leading-relaxed">
							Get paid seamlessly through Mada, Visa, Mastercard, and Apple Pay
							with our trusted payment gateway. Boost sales with smooth,
							Sharia-compliant transactions tailored for businesses in KSA
						</p>

						<div className="flex flex-col gap-3 mt-2">
							{features1.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4 + index * 0.1 }}
									className="flex items-center gap-3 text-gray-300"
								>
									<div className="flex-shrink-0 p-2 rounded-lg bg-main-green/10 text-main-green">
										{feature.icon}
									</div>
									<span className="font-medium">{feature.text}</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</motion.div>

				{/* Second Section */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="flex items-center justify-center gap-20 flex-col lg:flex-row-reverse"
				>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative flex-1 max-w-xl"
					>
						<div className="absolute -inset-4 bg-gradient-to-l from-main-green/20 to-transparent rounded-3xl blur-2xl" />
						<div className="relative p-8 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-3xl border border-gray-800">
							<Image
								src={SecondImg}
								alt="Control Panel"
								className="w-full h-auto"
								width={480}
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex flex-col gap-6 max-w-xl flex-1"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-green/10 border border-main-green/20 w-fit">
							<span className="text-sm font-medium text-main-green">
								Dashboard & Analytics
							</span>
						</div>

						<h2 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Powerful Control Panel
						</h2>

						<p className="text-lg text-gray-400 leading-relaxed">
							Easily manage all your payments from a single dashboard. Get
							detailed reports and analytics on every aspect of your financial
							transactions, helping you make informed business decisions
						</p>

						<div className="flex flex-col gap-3 mt-2">
							{features2.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4 + index * 0.1 }}
									className="flex items-center gap-3 text-gray-300"
								>
									<div className="flex-shrink-0 p-2 rounded-lg bg-main-green/10 text-main-green">
										{feature.icon}
									</div>
									<span className="font-medium">{feature.text}</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};
