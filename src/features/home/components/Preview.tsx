import Image from "next/image";
import FirstImg from "../../../../public/assets/imgs/undraw_credit-card_t6qm.svg";
import SecondImg from "../../../../public/assets/imgs/undraw_online-banking_l9sn.svg";
export const Preview = () => {
	return (
		<div className=" py-20">
			<div className="container flex flex-col gap-40">
				<div className="flex items-center justify-center gap-30">
					<Image
						src={FirstImg}
						alt="IMG"
						className="max-w-[700px]"
						width={480}
					/>

					<div className="flex flex-col gap-2 max-w-[30rem] flex-1">
						<div className="text-3xl font-bold">
							Accept Online Payments in Saudi Arabia with Fast, Secure and Easy
							steps
						</div>
						<p className="text-gray-400">
							Get paid seamlessly through Mada, Visa, Mastercard, and Apple Pay
							with our trusted payment gateway. Boost sales with smooth,
							Sharia-compliant transactions tailored for businesses in KSA
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center gap-30 flex-row-reverse">
					<Image
						src={SecondImg}
						alt="IMG"
						className=" max-w-[700px]"
						width={480}
					/>

					<div className="flex flex-col gap-2 max-w-[30rem] flex-1">
						<div className="text-3xl font-bold">Control Panel</div>
						<p className="text-gray-400">
							Easily manage all your payments from a single dashboard Get
							detailed reports and analytics on every aspect of your financial
							transactions, helping you make informed business decisions
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
