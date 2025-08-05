type TSectionTitle = {
	title: string;
	description: string;
};

export const SectionTitle = ({ description, title }: TSectionTitle) => {
	return (
		<div className="flex flex-col gap-1">
			<div className="font-bold text-4xl">{title}</div>
			<p className="text-light-green font-[600] capitalize">{description}</p>
		</div>
	);
};
