"use client";

import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcStripe } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
	return (
		<div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] text-center overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0d1f1a] -z-10" />

			{/* Animated grid pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] -z-10" />

			{/* Floating orbs */}
			<motion.div
				className="absolute top-20 left-20 w-72 h-72 bg-main-green/20 rounded-full blur-3xl"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-20 w-96 h-96 bg-main-green/10 rounded-full blur-3xl"
				animate={{
					scale: [1.2, 1, 1.2],
					opacity: [0.2, 0.4, 0.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<div className="container relative z-10 py-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="flex items-center justify-center flex-col gap-8"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-green/10 border border-main-green/20 backdrop-blur-sm"
					>
						<Sparkles className="w-4 h-4 text-main-green" />
						<span className="text-sm font-medium text-main-green">
							ZATCA-Compliant E-Invoicing
						</span>
					</motion.div>

					<div className="flex flex-col gap-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="flex flex-col gap-2"
						>
							<h1 className="text-6xl md:text-7xl lg:text-7xl font-bold leading-tight">
								<span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
									Grow your business with{" "}
								</span>
								<span className="bg-gradient-to-r from-main-green via-emerald-400 to-main-green bg-clip-text text-transparent animate-gradient">
									smart E-payment solutions
								</span>
							</h1>
						</motion.div>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
							className="font-medium max-w-[750px] mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
						>
							Fatoorah is an e-payment solution built for businesses in Saudi
							Arabia — offering invoicing, secure payment processing,
							ZATCA-compliant e-invoicing integration, and real-time transaction
							tracking.
						</motion.p>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.8 }}
						className="flex items-center gap-4 flex-wrap justify-center"
					>
						<Link href={"/login"}>
							<MainButton className="group relative overflow-hidden px-8 py-6 text-lg">
								<span className="relative z-10 flex items-center gap-2">
									Subscribe Now
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</span>
							</MainButton>
						</Link>
						{/* <Link href="#preview">
							<button className="px-8 py-6 text-lg font-medium rounded-lg border border-gray-700 hover:border-main-green/50 hover:bg-main-green/5 transition-all duration-300">
								Learn More
							</button>
						</Link> */}
					</motion.div>

					{/* Payment methods marquee */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.9, duration: 0.8 }}
						className="mt-8 w-full max-w-md"
					>
						<p className="text-sm text-gray-500 mb-4">
							Trusted payment methods
						</p>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#121212] to-transparent z-10" />
							<div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#121212] to-transparent z-10" />
							<Marquee speed={30} pauseOnHover delay={0} gradient={false}>
								<div className="flex items-center gap-8 mx-4">
									<FaCcVisa
										size={60}
										className="text-gray-600 hover:text-gray-400 transition-colors"
									/>
									<FaCcMastercard
										size={60}
										className="text-gray-600 hover:text-gray-400 transition-colors"
									/>
									<FaCcStripe
										size={60}
										className="text-gray-600 hover:text-gray-400 transition-colors"
									/>
									<FaCcVisa
										size={60}
										className="text-gray-600 hover:text-gray-400 transition-colors"
									/>
									<FaCcMastercard
										size={60}
										className="text-gray-600 hover:text-gray-400 transition-colors"
									/>
								</div>
							</Marquee>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};
