import "./num-results.less";

export interface NumResultsProps {
  numberOfResults: number;
  testId?: string;
}
export default function NumResults(props: NumResultsProps) {
  const { numberOfResults, testId } = props;
  return (
    <p className="num-results" data-testid={testId}>
      Found <strong>{numberOfResults}</strong> results
    </p>
  );
}
