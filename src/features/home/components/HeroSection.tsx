import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcStripe } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";

export const HeroSection = () => {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-64px)] text-center bg-gradient-to-r from-[#121212] via-[#121212] to-main-green">
			<div className="container">
				<div className="flex items-center justify-center flex-col gap-10">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-1 text-7xl capitalize font-bold">
							<div>Grow your business with </div>
							<span className="text-main-green">smart E-payment solutions</span>
						</div>
						<div className="font-[600] max-w-[700px] mx-auto text-lg">
							Fatoorah is an e-payment solution built for businesses in Saudi
							Arabia — offering invoicing, secure payment processing,
							ZATCA-compliant e-invoicing integration, and real-time transaction
							tracking.
						</div>
					</div>
					<Link href={"/login"}>
						<MainButton>Subscribe Now</MainButton>
					</Link>
					<Marquee speed={50} pauseOnHover delay={0} className="max-w-96">
						<FaCcVisa size={80} color="gray" className="mr-10" />
						<FaCcMastercard size={80} color="gray" className="mr-10" />
						<FaCcStripe size={80} color="gray" className="mr-10" />
					</Marquee>
				</div>
			</div>
		</div>
	);
};
