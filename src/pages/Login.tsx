import { useState } from "react";
import { useNavigate } from "react-router";

import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import Spinner from "../shared/components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const fakeLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) =>
    new Promise<{ success: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        if (email === "test@finapp.com" && password === "test123") {
          resolve({ success: true });
        } else {
          resolve({ success: false, error: "Invalid credentials" });
        }
      }, 1500);
    });

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

    const response = await fakeLogin(formData);
    setIsLoading(false);

    if (!response.success) {
      setLoginError(response.error ?? "Unknown error");
    } else {
      console.log("Login successful, redirecting...");
      navigate("/dashboard");
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
