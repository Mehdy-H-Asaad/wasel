"use client";
import { Button } from "@/components/ui/button";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	VisibilityState,
	ColumnFiltersState,
	getFilteredRowModel,
	useReactTable,
	PaginationState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaginationStore } from "@/shared/store/pagination.store";
import { useDebounce } from "@/shared/hooks/use-debounce";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: PaginationState;
	isLoading?: boolean;
	pageCount?: number;
	totalCount?: number;
	searchablePlaceholder: string;
	children?: React.ReactNode;
	manualPagination?: boolean;
	setSearchableField: (filter: string) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageCount,
	isLoading,
	searchablePlaceholder,
	children,
	manualPagination = true,
	setSearchableField,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { pagination, setPagination } = usePaginationStore();

	// Create a debounced search function
	const debouncedSearch = useDebounce({
		callback: setSearchableField,
		delay: 500,
	});

	const table = useReactTable({
		data,
		columns,
		...(manualPagination && {
			pageCount,
			manualPagination: true,
			onPaginationChange: updater => {
				setPagination(
					typeof updater === "function" ? updater(pagination) : updater
				);
			},
		}),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			...(manualPagination && { pagination }),
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
	});

	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-6">
				<Input
					placeholder={searchablePlaceholder}
					onChange={e => {
						debouncedSearch(e.target.value);
					}}
					className="max-w-sm w-60 bg-transparent border-gray-500"
				/>
				{children}
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-96">
					<Skeleton className="w-full h-full" />
				</div>
			) : (
				<div className=" border border-gray-500">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow
									className=" rounded-md border border-gray-500"
									key={headerGroup.id}
								>
									{headerGroup.headers.map(header => (
										<TableHead className="rtl:text-right" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										className="rounded-md border border-gray-500"
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Pagination buttons */}
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					className="bg-transparent hover:bg-black hover:text-white duration-200 border dark:text-white text-black border-gray-500 cursor-pointer"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					className="bg-transparent hover:bg-black hover:text-white duration-200 border dark:text-white text-black border-gray-500 cursor-pointer"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
