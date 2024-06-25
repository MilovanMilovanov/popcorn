import { ReactNode } from "react";
import "./generic-text.less";

export interface GenericMessageProps {
  testId?: string;
  children?: ReactNode;
}

export default function GenericMessage(
  props: GenericMessageProps
): JSX.Element {
  const { testId, children } = props;
  return (
    <p className="generic-message" data-testid={testId}>
      <span>🙂</span>
      {children}
    </p>
  );
}
