import styles from "./switch.module.less";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";

interface SwitchProps {
  testId?: string;
}

export default function Switch(props: SwitchProps) {
  const { theme, handleThemeChange } = useMovieAppContext();
  const { testId } = props;

  return (
    <div>
      <label className={styles.switch} htmlFor="theme-switch">
        <span className={styles["switch-label"]}>theme</span>
        <input
          data-testid={testId}
          type="checkbox"
          id="theme-switch"
          onChange={handleThemeChange}
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
