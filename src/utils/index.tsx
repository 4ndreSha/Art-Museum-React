import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [value, delay]);

  return debouncedValue;
}
