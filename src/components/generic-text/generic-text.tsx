import "./generic-text.less";

export default function GenericMessage(props: { text: string }): JSX.Element {
  return (
    <p className="generic-message" data-testid="genericTextId">
      <span>🙂</span>
      {props.text}
    </p>
  );
}
