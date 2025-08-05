import { Contact } from "@/features/home/components/Contact";
import { ExplainVideo } from "@/features/home/components/ExplainVideo";
import { FAQs } from "@/features/home/components/FAQs";
import { HeroSection } from "@/features/home/components/HeroSection";
import { Services } from "@/features/home/components/Services";
import { SubscribeBanner } from "@/features/home/components/SubscribeBanner";
import { Preview } from "@/features/home/components/Preview";

export default function Home() {
	return (
		<>
			<HeroSection />
			<ExplainVideo />
			<Services />
			<Preview />
			<FAQs />
			<SubscribeBanner />
			<Contact />
		</>
	);
}
