import { MouseEventHandler, useRef } from "react";

export const useClickOutsideToClose = (onClose: () => void) => {
  const mouseDownTarget = useRef<EventTarget | null>(null);

  const onMouseDown: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      mouseDownTarget.current = e.target;
    } else {
      mouseDownTarget.current = null;
    }
  };

  const onMouseUp: MouseEventHandler = (e) => {
    if (
      e.target === e.currentTarget &&
      mouseDownTarget.current === e.currentTarget
    ) {
      onClose();
    }
  };

  return { onMouseDown, onMouseUp };
};
