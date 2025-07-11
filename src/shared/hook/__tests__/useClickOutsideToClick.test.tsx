import { render, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useClickOutsideToClose } from "../useClickOutsideToClose";

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  const { onMouseDown, onMouseUp } = useClickOutsideToClose(onClose);
  return (
    <div
      data-testid="backdrop"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={-1} // Para evitar advertencias de accesibilidad falsas
    >
      <div data-testid="modal">Modal content</div>
    </div>
  );
};

describe("useClickOutsideToClose", () => {
  it("calls onClose when clicking outside", () => {
    const onClose = vi.fn();
    render(<TestComponent onClose={onClose} />);

    const backdrop = screen.getByTestId("backdrop");

    fireEvent.mouseDown(backdrop);
    fireEvent.mouseUp(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when clicking inside the modal", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} />);

    const modal = screen.getByTestId("modal");

    fireEvent.mouseDown(modal);
    fireEvent.mouseUp(modal);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does NOT call onClose when click starts inside the modal and ends outside", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} />);

    const modal = screen.getByTestId("modal");
    const backdrop = screen.getByTestId("backdrop");

    fireEvent.mouseDown(modal);
    fireEvent.mouseUp(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does NOT call onClose when click starts outside and ends inside the modal", () => {
    const onClose = vi.fn();
    render(<TestComponent onClose={onClose} />);

    const modal = screen.getByTestId("modal");
    const backdrop = screen.getByTestId("backdrop");

    fireEvent.mouseDown(backdrop);
    fireEvent.mouseUp(modal);

    expect(onClose).not.toHaveBeenCalled();
  });
});
