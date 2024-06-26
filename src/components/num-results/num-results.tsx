import { useEffect, useRef } from "react";
import "./num-results.less";

export interface NumResultsProps {
  numberOfResults: number;
  testId?: string;
}
export default function NumResults(props: NumResultsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { numberOfResults, testId } = props;

  useEffect(() => {
    if (ref.current) {
      numberOfResults !== 0
        ? (ref.current.style.animationPlayState = "paused")
        : (ref.current.style.animationPlayState = "running");
    }
  }, [numberOfResults]);

  return (
    <div className="num-results-container">
      <span ref={ref} className="num-results animate" data-testid={testId}>
        Found<pre> </pre>
        {numberOfResults ? (
          <>
            <strong className="zoom">{numberOfResults}</strong>
            <div className="zoom-placeholder">{numberOfResults}</div>
          </>
        ) : (
          <strong>{numberOfResults}</strong>
        )}
        <pre> </pre>
        results
      </span>
    </div>
  );
}
