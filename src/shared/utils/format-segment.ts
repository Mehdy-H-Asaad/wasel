export const formatSegment = (segment: string) => {
	return segment
		.split("-")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
