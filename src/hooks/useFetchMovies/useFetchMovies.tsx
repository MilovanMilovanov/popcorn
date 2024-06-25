import { useEffect, useState } from "react";
import { MovieDetailsProps } from "../../components/movie/Movie";

const API_KEY = "d74493d0";

export default function useFetchMovies(query: string) {
  const [movies, setMovies] = useState<MovieDetailsProps[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch a movie!");
        }

        if (data.Response === "False") {
          throw new Error("No Movie Found!");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
