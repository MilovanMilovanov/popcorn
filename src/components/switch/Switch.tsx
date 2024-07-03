import useTheme from "../../hooks/useTheme/useTheme";
import styles from "./switch.module.less";

interface SwitchProps {
  testId?: string;
}
export default function Switch(props: SwitchProps) {
  const [theme, handleChange] = useTheme("dark");
  const { testId } = props;

  return (
    <div>
      <label className={styles.switch} htmlFor="theme-switch">
        <span className={styles["switch-label"]}>theme</span>
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
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
