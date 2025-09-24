export type TPagination = {
	limit?: number;
	current_page?: number;
};
export type TServerResponse<T> = {
	data: T;
	limit?: number;
	total_rows?: number;
	total_pages?: number;
	current_page?: number;
};
