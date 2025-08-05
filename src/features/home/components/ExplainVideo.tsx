import { SectionTitle } from "@/components/common/SectionTitle";

export const ExplainVideo = () => {
	return (
		<div className="py-20">
			<div className="container">
				<div className="mb-20 flex justify-center text-center">
					<SectionTitle
						title="How Faotarah work"
						description="This video explains how to set up your account and start working on faotarah"
					/>
				</div>
				<div className="flex justify-center">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/8JlN5CaUH58?si=39otv3uwihUR1ZaK"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				</div>
			</div>
		</div>
	);
};
