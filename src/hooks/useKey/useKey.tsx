import { useEffect } from "react";
import { MovieComponentProps } from "../../components/movie/Movie";

enum KeyType {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Enter = "Enter",
  Escape = "Escape",
}

export const handleKeyPress = <Params extends MovieComponentProps>(
  params: Params,
  action: (params: Params) => void
) => action?.(params);

export default function useKey(action: (key: keyof typeof KeyType) => void) {
  useEffect(() => {
    const callBack = (e: KeyboardEvent) => {
      const key = e.code;

      if (!Object.values(KeyType).includes(key as any)) return;

      action(key as keyof typeof KeyType);
    };

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [action]);
}
