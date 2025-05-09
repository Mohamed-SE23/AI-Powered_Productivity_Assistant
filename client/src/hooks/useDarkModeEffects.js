// src/hooks/useDarkModeEffect.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../app/darkMode"; 

export default function useDarkModeEffect() {
  const darkMode = useSelector(selectTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
}
