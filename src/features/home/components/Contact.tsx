"use client";

import { SectionTitle } from "@/components/common/SectionTitle";
import Image from "next/image";
import ContactImg from "../../../../public/assets/imgs/undraw_mail_fzk2 (1).svg";
import { contactSchema } from "../schema/contact.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainButton } from "@/components/common/MainButton";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, MessageSquare, User, Send } from "lucide-react";

export const Contact = () => {
	const sendEmailSchema = contactSchema;

	type TSendEmailSchema = z.infer<typeof sendEmailSchema>;

	const SendEmailForm = useForm<TSendEmailSchema>({
		resolver: zodResolver(sendEmailSchema),
		defaultValues: {
			email: "",
			message: "",
			name: "",
			subject: "",
		},
	});

	return (
		<div className="py-32 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-main-green/5 rounded-full blur-3xl -translate-y-1/2" />

			<div className="container relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="mb-20 flex justify-center text-center"
				>
					<SectionTitle
						title="Get In Touch"
						description="Feel free to reach out to us. We're here to help!"
					/>
				</motion.div>

				<div className="flex items-center justify-center gap-20 flex-col lg:flex-row">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex-1 max-w-xl w-full"
					>
						<div className="relative">
							<div className="absolute -inset-4 bg-gradient-to-r from-main-green/20 to-transparent rounded-3xl blur-2xl" />

							<div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-8 md:p-10 rounded-3xl border border-gray-800">
								<Form {...SendEmailForm}>
									<form className="flex flex-col gap-6">
										<FormField
											control={SendEmailForm.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="flex items-center gap-2 text-base">
														<User className="w-4 h-4 text-main-green" />
														Full Name
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="John Doe"
															className="bg-[#0a0a0a] border-gray-800 focus:border-main-green/50 h-12 text-base"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={SendEmailForm.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="flex items-center gap-2 text-base">
														<Mail className="w-4 h-4 text-main-green" />
														Email
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="email"
															placeholder="john@example.com"
															className="bg-[#0a0a0a] border-gray-800 focus:border-main-green/50 h-12 text-base"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={SendEmailForm.control}
											name="subject"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="flex items-center gap-2 text-base">
														<MessageSquare className="w-4 h-4 text-main-green" />
														Subject
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="How can we help?"
															className="bg-[#0a0a0a] border-gray-800 focus:border-main-green/50 h-12 text-base"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={SendEmailForm.control}
											name="message"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="flex items-center gap-2 text-base">
														<Send className="w-4 h-4 text-main-green" />
														Your Message
													</FormLabel>
													<FormControl>
														<Textarea
															{...field}
															placeholder="Tell us more about your inquiry..."
															className="bg-[#0a0a0a] border-gray-800 focus:border-main-green/50 min-h-32 text-base resize-none"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<MainButton className="w-full mt-2 h-12 text-base group">
											<span className="flex items-center gap-2 justify-center">
												Send Message
												<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
											</span>
										</MainButton>
									</form>
								</Form>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="flex-1 max-w-md hidden lg:block"
					>
						<div className="relative">
							<div className="absolute -inset-4 bg-gradient-to-l from-main-green/20 to-transparent rounded-3xl blur-2xl" />
							<div className="relative p-8 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-3xl border border-gray-800">
								<Image
									src={ContactImg}
									alt="Contact Us"
									width={400}
									className="w-full h-auto"
								/>
							</div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.5 }}
							className="mt-8 space-y-4"
						>
							<div className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-xl border border-gray-800">
								<h3 className="font-bold mb-2 flex items-center gap-2">
									<Mail className="w-5 h-5 text-main-green" />
									Email Support
								</h3>
								<p className="text-gray-400 text-sm">support@faotarah.com</p>
							</div>
							<div className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-xl border border-gray-800">
								<h3 className="font-bold mb-2 flex items-center gap-2">
									<MessageSquare className="w-5 h-5 text-main-green" />
									Response Time
								</h3>
								<p className="text-gray-400 text-sm">
									We typically respond within 24 hours
								</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
