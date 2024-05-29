import { ChangeEvent, RefObject, useEffect, useRef } from "react";
import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import useKey from "../../hooks/useKey/useKey";
import "./search.less";

export interface SearchProps extends PropsWithOptionalChildren {
  query?: string;
  inputRef?: RefObject<HTMLInputElement>;
  handleSearch: (e?: ChangeEvent<HTMLInputElement>) => void;
}

const handleEnter = (key: string, params: SearchProps) => {
  if (key === "Enter") {
    const { inputRef, handleSearch } = params;
    if (inputRef?.current) {
      if (document.activeElement === inputRef.current) return;
      handleSearch();
      inputRef.current.focus();
    }
  }
};

export default function Search(props: SearchProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, handleSearch, children } = props;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const keyHandlerParams = { inputRef, handleSearch };
  useKey((key) => handleEnter(key, keyHandlerParams));

  return (
    <section className="search-wrapper">
      <input
        ref={inputRef}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleSearch}
        data-testid="searchId"
        role="search"
      />
      {children && <div>{children}</div>}
    </section>
  );
}
