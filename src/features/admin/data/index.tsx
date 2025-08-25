import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";

export const adminNavLinks = [
	{
		title: "Analytics",
		href: "/admin",
		icon: <IoAnalyticsOutline size={20} />,
	},
	{
		title: "Invoices",
		href: "/admin/invoices",
		icon: <FaFileInvoiceDollar size={20} />,
	},
	{
		title: "Clients",
		href: "/admin/clients",
		icon: <GrGroup size={20} />,
	},
	{
		title: "Stock",
		href: "/admin/stock",
		icon: <FiBox size={20} />,
	},
];
