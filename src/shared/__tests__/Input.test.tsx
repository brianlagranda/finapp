import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../ui/Input";

describe("Email Input", () => {
  let handleChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleChange = vi.fn();
    render(
      <Input
        label="email"
        name="email"
        type="email"
        value="test@finapp.com"
        onChange={handleChange}
      ></Input>,
    );
  });

  it("should render an email input with correct label", () => {
    const input = screen.getByLabelText("email");
    expect(input).not.toBeNull();
  });

  it("should have type email", () => {
    const input = screen.getByLabelText("email");
    expect(input.getAttribute("type")).toBe("email");
  });

  it("should call onChange for each character typed", async () => {
    const input = screen.getByLabelText("email");

    await userEvent.type(input, "testing");

    expect(handleChange).toHaveBeenCalledTimes(7);
  });
});
