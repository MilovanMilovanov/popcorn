import { useEffect } from "react";
import { keyHandlerParamsProps } from "../../components/movie-list/Movie-list";

enum Keys {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Enter = "Enter",
  Escape = "Escape",
}

export const handleKeyPress = <KeyParams extends keyHandlerParamsProps>(
  params: KeyParams,
  action: (params: KeyParams) => void
) => action?.(params);
type KeyType = keyof typeof Keys;

export default function useKey(action: (key: KeyType) => void) {
  useEffect(() => {
    const callBack = (e: KeyboardEvent) => {
      const key = e.code;

      if (!Object.values(Keys).includes(key as any)) return;

      action(key as KeyType);
    };

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [action]);
}
