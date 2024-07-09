import styles from "./movie-statistics.module.less";

export type StatisticProps = {
  year?: string;
  imdbRating?: string;
  userRating?: number | null;
  runtime?: string | undefined;
  watchedMoviesNumber?: string;
};

const icon = {
  imdbRating: "⭐️",
  userRating: "🌟",
  runtime: "⏳",
  watchedMoviesNumber: "#️⃣",
  year: "🗓",
};

export interface MovieStatisticsProps {
  testId?: string;
  statistics: StatisticProps;
}

export default function MovieStatistics(props: MovieStatisticsProps) {
  const { statistics, testId } = props;

  return (
    <section
      className={styles["movie-statistics-container"]}
      data-testid={testId}
    >
      {Object.keys(statistics).map((key) => (
        <div key={key} className={styles["statistic-wrapper"]}>
          <span className={styles.icon}>
            {icon[key as keyof typeof statistics]}
          </span>
          <span className={styles.statistic}>
            {statistics[key as keyof typeof statistics]}
          </span>
        </div>
      ))}
    </section>
  );
}
