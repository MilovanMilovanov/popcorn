import useTheme from "../../hooks/useTheme/useTheme";
import "./switch.less";

interface SwitchProps {
  testId?: string;
}
export default function Switch(props: SwitchProps) {
  const [theme, handleChange] = useTheme("dark");
  const { testId } = props;

  return (
    <div className="container-switch">
      <label className="switch" htmlFor="theme-switch">
        <span className="switch-label">theme</span>
        <input
          data-testid={testId}
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
