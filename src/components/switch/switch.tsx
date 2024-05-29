import useTheme from "../../hooks/useTheme/useTheme";
import "./switch.less";

export default function Switch() {
  const [theme, handleChange] = useTheme("dark");

  return (
    <div className="container-switch">
      <label className="switch" htmlFor="theme-switch">
        <span className="switch-label">theme</span>
        <input
          type="checkbox"
          id="theme-switch"
          onChange={handleChange}
          checked={theme === "dark"}
          aria-checked={theme === "dark"}
          aria-label="Toggle theme"
          role="switch"
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
