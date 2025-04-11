import { useEffect, useState } from 'react';

/**
 * Example usage:
 *
 * <pre>
 *
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *    // This will run when the user has stopped typing for 500ms
 *   console.log(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 *
 * </pre>
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
