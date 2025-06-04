import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../ui/Button";

describe("Button", () => {
  it("should render login button with the correct text passed through children", () => {
    render(<Button>Login</Button>);

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).not.toBeNull();
  });

  it("should handle onClick event", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Login</Button>);

    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not be clickable when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled={true}>
        Login
      </Button>,
    );

    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("should have type 'submit'", () => {
    render(<Button type="submit">Login</Button>);

    const button = screen.getByRole("button", { name: /login/i });

    expect(button.getAttribute("type")).toBe("submit");
  });
});
