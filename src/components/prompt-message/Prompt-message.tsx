import { ReactNode } from "react";
import "./prompt-message.less";

export interface PromptMessageProps {
  testId?: string;
  children?: ReactNode;
}

export default function PromptMessage(props: PromptMessageProps): JSX.Element {
  const { testId, children } = props;
  return (
    <p className="prompt-message" data-testid={testId}>
      <span>🙂</span>
      {children}
    </p>
  );
}
