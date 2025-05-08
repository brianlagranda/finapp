import { useState } from "react";
import { validateLoginForm } from "../lib/validateLoginForm";
import authStore from "./authStore";

export const useLoginForm = () => {
  const login = authStore((state) => state.login);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginForm(formData);
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
    }
  };

  return {
    formData,
    errors,
    isLoading,
    loginError,
    handleChange,
    handleSubmit,
  };
};
