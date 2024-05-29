import "./num-results.less";

export default function NumResults<N extends { num: number }>(
  props: N
): JSX.Element {
  return (
    <p className="num-results" data-testid="numResultsId">
      Found <strong>{props.num}</strong> results
    </p>
  );
}
