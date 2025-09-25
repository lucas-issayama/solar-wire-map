import { useEffect, useState } from "react";

export function useLocalStorage<T>(item: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let value = localStorage.getItem(item);
    if (value) setValue(JSON.parse(value));
  }, [item]);

  const updateLocalStorage = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(item, JSON.stringify(newValue));
  };

  return {
    value,
    updateLocalStorage,
  };
}

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   // Get the initial value from localStorage or use the provided initialValue
//   const storedValue = localStorage?.getItem(key);
//   const initial = storedValue ? JSON.parse(storedValue) : initialValue;

//   // Create a state variable to track the value
//   const [value, setValue] = useState<T>(initial);

//   // Update the localStorage value when the state changes
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue] as const;
// }
