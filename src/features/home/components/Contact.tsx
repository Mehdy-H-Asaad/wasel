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
		<div className="py-20">
			<div className="container">
				<div className="mb-20 flex justify-center text-center">
					<SectionTitle
						title="Contact Us"
						description="Feel free to reach and contact us"
					/>
				</div>

				<div className="flex items-center justify-center gap-40">
					<Form {...SendEmailForm}>
						<form className="flex flex-col gap-8 w-96">
							<FormField
								control={SendEmailForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Full Name" />
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
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Email" />
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
										<FormLabel>Subject</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Subject" />
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
										<FormLabel>Your Message</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Your Message" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<MainButton>Submit</MainButton>
						</form>
					</Form>

					<Image src={ContactImg} alt="CONTACT-IMG" width={400} />
				</div>
			</div>
		</div>
	);
};
