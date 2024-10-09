import { useEffect, useState } from "react";
import * as yup from "yup";

export function useDebounce<T>(value: T, delay: number = 700) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [value, delay]);

  return debouncedValue;
}
