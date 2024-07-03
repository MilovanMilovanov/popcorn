import styles from "./error.module.less";

export interface ErrorProps {
  error: string;
  testId?: string;
}
export default function ErrorMessage(props: ErrorProps) {
  const { error, testId } = props;
  return (
    <p data-testid={testId} className={styles.error}>
      <span>❌</span>
      {error}
    </p>
  );
}
