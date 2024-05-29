import "./error.less";

export default function ErrorMessage(props: { error: string }): JSX.Element {
  return (
    <p className="error" data-testid="errorId">
      <span>❌</span>
      {props.error}
    </p>
  );
}
