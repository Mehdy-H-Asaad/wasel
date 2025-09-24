import { useCallback, useEffect, useRef } from "react";

export const useDebounce = ({
	callback,
	delay,
}: {
	callback: (filter: string) => void;
	delay: number;
}) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	);

	const debouncedCallback = useCallback(
		(filter: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(filter);
			}, delay);
		},
		[callback, delay]
	);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedCallback;
};
