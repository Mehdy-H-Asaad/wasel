import { navLinks } from "@/shared/data/navLinks";
import Link from "next/link";
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaMapPin,
	FaPhone,
} from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { MainButton } from "../common/MainButton";

export const Footer = () => {
	return (
		<div className="py-20 border-t border-t-[#2e2e2e]">
			<div className="container">
				<div className="grid grid-cols-4 gap-20">
					<div className="flex flex-col gap-4">
						<div className="text-3xl font-bold">FAOTARAH</div>
						<div className="flex items-center gap-4">
							<a href="#" target="_blank">
								<FaInstagram size={20} className="text-[#898989]" />
							</a>
							<a href="#" target="_blank">
								<FaFacebook size={20} className="text-[#898989]" />
							</a>
							<a href="#" target="_blank">
								<FaLinkedin size={20} className="text-[#898989]" />
							</a>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="font-bold text-3xl">Links</div>
						<div className="flex flex-col gap-4">
							{navLinks.map(navLink => (
								<Link
									key={navLink.href}
									className="text-[#898989] hover:pl-2 duration-200 hover:text-main-green w-fit font-medium"
									href={navLink.href}
								>
									{navLink.title}
								</Link>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="text-3xl font-bold">Contact</div>
						<div className="flex flex-col gap-8">
							<div className="flex items-center gap-4 hover:pl-2  text-[#898989] duration-200 hover:text-main-green w-fit font-medium">
								<FaRegEnvelope size={24} />
								<a href="#" target="_blank">
									faotarah@gmail.com
								</a>
							</div>
							<div className="flex items-center hover:pl-2 gap-4 text-[#898989] duration-200 hover:text-main-green w-fit font-medium">
								<FaMapPin size={24} />
								<a href="#" target="_blank">
									Dubai, United Arab Emirates
								</a>
							</div>
							<div className="flex items-center hover:pl-2  gap-4 text-[#898989] duration-200 hover:text-main-green w-fit font-medium">
								<FaPhone size={24} />
								<a href="#" target="_blank">
									+971 507725069
								</a>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-4 self-start">
						<MainButton>Login</MainButton>
						<MainButton className="bg-white text-black hover:text-white">
							AR
						</MainButton>
					</div>
				</div>
			</div>
			<div className="text-main-gray w-fit mx-auto pt-40">
				© 2025 <span className="font-bold">FAOTARAH</span>. All rights reserved.
			</div>
		</div>
	);
};
