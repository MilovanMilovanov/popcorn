import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import popcornDarkDemo from "../../assets/popcorn-dark-demo.gif";
import popcornLightDemo from "../../assets/popcorn-light-demo.gif";
import styles from "./demo-gif.module.less";

export interface DemoGifProps {
  width?: number;
  testId?: string;
}
export default function DemoGif(props: DemoGifProps) {
  const { theme } = useMovieAppContext();
  const { width, testId } = props;

  return (
    <img
      data-testid={testId}
      className={styles["demo-movie-gif-container"]}
      src={theme === "dark" ? popcornLightDemo : popcornDarkDemo}
      alt="movie app demo gif"
      width={`${width}%`}
    />
  );
}
