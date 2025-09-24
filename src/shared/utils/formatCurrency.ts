export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "SAR",
		maximumFractionDigits: 2,
	}).format(value);
};
