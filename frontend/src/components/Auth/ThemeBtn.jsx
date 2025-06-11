
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)]"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="text-xl flex items-center justify-center p-1.5 rounded-lg cursor-pointer"
      >
        {theme === "light" ? <Moon /> : <Sun /> }
      </button>
    </div>
  );
}