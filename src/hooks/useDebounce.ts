import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any value (e.g. search input string).
 * Delays updating the debounced value until after `delay` milliseconds
 * have elapsed since the last time the value was modified.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
