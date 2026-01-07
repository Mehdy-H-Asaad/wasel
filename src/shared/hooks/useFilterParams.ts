import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useFilterParams = <TFilters extends Record<string, any>>() => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Generic function to update filters
  const updateFilters = (
    newFilters: TFilters,
    options: { resetPage?: boolean } = { resetPage: true }
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove each filter
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to first page when filters change (optional)
    if (options.resetPage) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Generic getter with type casting
  const getFilter = useCallback(
    <T = string>(key: string, defaultValue?: T): T | undefined => {
      const value = searchParams.get(key);
      if (value === null) return defaultValue;
      return value as T;
    },
    [searchParams]
  );

  return {
    updateFilters,
    clearFilters,
    getFilter,
    searchParams,
  };
};
