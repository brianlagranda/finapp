import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import LoginForm from "../ui/LoginForm";

describe("LoginForm", () => {
  it("should render login form with pre-filled values and handle events", () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();

    render(
      <LoginForm
        formData={{ email: "test@finapp.com", password: "test123" }}
        errors={{}}
        loginError=""
        isLoading={false}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
    );

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i,
    ) as HTMLInputElement;

    expect(emailInput.value).toBe("test@finapp.com");
    expect(passwordInput.value).toBe("test123");

    fireEvent.change(emailInput, {
      target: { value: "new@email.com", name: "email" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);

    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should display loading spinner when submitting", () => {
    render(
      <LoginForm
        formData={{ email: "test@finapp.com", password: "test123" }}
        errors={{}}
        loginError=""
        isLoading={true}
        handleChange={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.getByTestId("spinner")).not.toBeNull();
  });

  it("should show validation error messages", () => {
    render(
      <LoginForm
        formData={{ email: "", password: "" }}
        errors={{
          email: "Email is required",
          password: "Password is required",
        }}
        loginError=""
        isLoading={false}
        handleChange={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.queryByText(/email is required/i)).not.toBeNull();
    expect(screen.queryByText(/password is required/i)).not.toBeNull();
  });
});
