import { ReactNode, RefObject, useEffect, useRef } from "react";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import useKey from "../../hooks/useKey/useKey";
import styles from "./search.module.less";

export interface SearchProps {
  children?: ReactNode;
  testId?: string;
}

interface HandleEnterProps {
  key: string;
  inputRef: RefObject<HTMLDivElement>;
  handleSearch: () => void;
}

const handleEnter = (params: HandleEnterProps) => {
  const { key, inputRef, handleSearch } = params;
  if (key === "Enter") {
    if (inputRef?.current) {
      if (document.activeElement === inputRef.current) return;
      handleSearch();
      inputRef.current.focus();
    }
  }
};

export default function Search(props: SearchProps) {
  const { query, handleSearch } = useMovieAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const { testId, children } = props;

  useKey((key) => handleEnter({ key, inputRef, handleSearch }));
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className={styles["search-wrapper"]}>
      <input
        value={query}
        ref={inputRef}
        data-testid={testId}
        className={styles.search}
        type="text"
        role="search"
        placeholder="Search movies..."
        onChange={handleSearch}
      />
      {children && <div>{children}</div>}
    </section>
  );
}
