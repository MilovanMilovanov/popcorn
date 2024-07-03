import { ReactNode } from "react";
import styles from "./prompt-message.module.less";

export interface PromptMessageProps {
  testId?: string;
  children: ReactNode;
}

export default function PromptMessage(props: PromptMessageProps): JSX.Element {
  const { testId, children } = props;
  return (
    <p className={styles["prompt-message"]} data-testid={testId}>
      <span>🙂</span>
      {children}
    </p>
  );
}
