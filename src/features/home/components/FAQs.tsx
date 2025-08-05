import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import FAQsImg from "../../../../public/assets/imgs/undraw_correct-answer_vjt7.svg";
import { SectionTitle } from "@/components/common/SectionTitle";
export const FAQs = () => {
	const FAQS_DATA = [
		{
			id: 1,
			question: "Is it accessible?",
			answer: " Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			id: 2,
			question: "Is it accessible?",
			answer: " Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			id: 3,
			question: "Is it accessible?",
			answer: " Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			id: 4,
			question: "Is it accessible?",
			answer: " Yes. It adheres to the WAI-ARIA design pattern.",
		},
	];
	return (
		<div className="py-20">
			<div className="container">
				<div className="mb-20 flex justify-center text-center">
					<SectionTitle
						title="FAQs"
						description="Answers for most common questions"
					/>
				</div>
				<div className="flex items-center justify-center gap-40">
					<Image
						src={FAQsImg}
						alt="SAUDI-BURJ"
						width={480}
						className=" self-start"
					/>
					<Accordion className="w-[30rem]" type="single" collapsible>
						<div className="flex flex-col gap-10">
							{FAQS_DATA.map(faq => (
								<AccordionItem key={faq.id} value={`item-${faq.id}`}>
									<AccordionTrigger className="text-base cursor-pointer font-[500] capitalize hover:text-main-green">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent>{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</div>
					</Accordion>
				</div>
			</div>
		</div>
	);
};
