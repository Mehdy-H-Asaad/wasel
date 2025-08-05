import Image from "next/image";
import SaudiImg from "../../../../public/assets/imgs/saudi-riyal-svgrepo-com (1).svg";
import { MdFactCheck } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { BiBrain } from "react-icons/bi";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Services = () => {
	const SERVICES_DATA = [
		{
			id: 1,
			title: "Built for KSA’s market",
			description:
				"Specially designed for KSA businesses to automatically fulfill all ZATCA e-invoicing requirements",
		},
		{
			id: 2,
			title: "Payments & ZATCA Compliance",
			description:
				"From secure payments to automated tax submissions, Faotarah ensures your business meets Saudi Arabia’s e-invoicing regulations without hassle",
			icon: <MdFactCheck size={40} />,
		},
		{
			id: 3,
			title: "Secure Payments",
			description:
				"Safeguard your transactions with advanced payment security while Faotarah automates your tax compliance, ensuring full alignment with ZATCA regulations in Saudi Arabia",
			icon: <GoShieldCheck size={40} />,
		},
		{
			id: 4,
			title: "Smart Payments",
			description:
				"Simplify transactions and stay ZATCA-compliant with Faotarah, your all-in-one payment and tax solution for KSA businesses",
			icon: <BiBrain size={40} />,
		},
	];

	return (
		<div className=" py-20">
			<div className="container">
				<div className="mb-20 flex justify-center text-center">
					<SectionTitle
						title="Why Faotarah"
						description="Fast and secure – empowering your business to grow effortlessly."
					/>
				</div>
				<div className="grid grid-cols-2 gap-10">
					{SERVICES_DATA.map(service => (
						<div
							key={service.id}
							className="flex flex-col gap-4 justify-center bg-[#171717] p-16 rounded-4xl"
						>
							<div className="flex items-center gap-4">
								{service.icon ? (
									service.icon
								) : (
									<Image height={40} src={SaudiImg} alt="SAUDI-IMG" />
								)}
								<div className="text-2xl font-bold max-w-[700px]">
									{service.title}
								</div>
							</div>
							<p className="text-lg">{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
