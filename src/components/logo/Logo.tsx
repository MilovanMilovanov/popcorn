import styles from "./logo.module.less";

export interface LogoProps {
  isMovieLoaded?: boolean;
  testId?: string;
}

export default function Logo(props: LogoProps) {
  const { isMovieLoaded, testId } = props;
  return (
    <div data-testid={testId} className={styles["logo-container"]}>
      <img
        className={`${styles["logo-img"]} ${
          isMovieLoaded ? styles["logo-highlight"] : ""
        }`}
        src="src\assets\popcorn.jpg"
        alt="animated popcorn image"
      />
      <h1 className={styles.heading}>usePopcorn</h1>
    </div>
  );
}
