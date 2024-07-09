import { ChangeEvent, useLayoutEffect } from "react";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

type Theme = "dark" | "light";

type useThemeReturn = [string, (e: ChangeEvent<HTMLInputElement>) => void];

export default function useTheme(initialTheme: Theme): useThemeReturn {
  const [theme, setTheme] = useLocalStorage<Theme>(initialTheme, "theme");

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, handleThemeChange];
}
