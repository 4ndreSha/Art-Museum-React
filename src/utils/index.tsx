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

export const validationSchema = yup
  .string()
  .min(1, "Type at leats 2 character :)")
  .max(50, "The input is too long. Please shorten it to 50 characters or less.")
  .matches(/^[a-zA-Z0-9\s]*$/, "Please enter only Latin characters, digits, and spaces.");
