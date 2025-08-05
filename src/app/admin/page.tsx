import { SalesChart } from "@/features/admin/components/SalesChart";
import React from "react";
import { IoMdTrendingUp } from "react-icons/io";

const AdminPage = () => {
	return (
		<div>
			<div className="grid grid-cols-4 gap-4 py-10">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="p-6 flex flex-col gap-2 bg-white dark:bg-main-black dark:text-white rounded-lg "
					>
						<div className="flex items-center justify-between">
							<div className="font-bold text-3xl text-main">Total Revune</div>
							<IoMdTrendingUp size={24} />
						</div>
						<div className="text-lg font-semibold">$1,250.00</div>
					</div>
				))}
			</div>
			<SalesChart />
		</div>
	);
};

export default AdminPage;
