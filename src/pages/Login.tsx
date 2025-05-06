import { useState } from "react";
import { Navigate } from "react-router";

import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import Spinner from "../shared/ui/Spinner/Spinner";

import { useAuth } from "../features/auth/hooks/useAuth";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Your password length is too short";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setLoginError("");

    const response = await login(formData.email, formData.password);
    setIsLoading(false);

    if (!response) {
      setLoginError("Invalid Credentials");
    } else {
      console.log("Login successful, redirecting..."); // TO-DO: Change this console.log to a toastify notification.
    }
  };

  return (
    <>
      <h1 className="py-4 text-center text-3xl">FinApp</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-[345px] flex-col justify-evenly gap-4 rounded-lg p-4 backdrop-blur-md"
      >
        <Input
          label={"email"}
          name={"email"}
          type={"email"}
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />

        <Input
          label={"password"}
          name={"password"}
          type={"password"}
          value={formData.password}
          error={errors.password}
          onChange={handleChange}
        />

        {loginError && <p className="text-center text-red-500">{loginError}</p>}

        {!isLoading ? (
          <Button
            type="submit"
            disabled={!formData.email || !formData.password}
          >
            Login
          </Button>
        ) : (
          <Spinner />
        )}
      </form>
    </>
  );
};

export default Login;
