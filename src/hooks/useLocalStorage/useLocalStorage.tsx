import { useEffect, useState } from "react";

export default function useLocalStorage<T>(initialValue: T, key: string) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );
  return [value, setValue];
}
