import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    console.log("Form submitted successfully");
  };

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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-[380px] w-[345px] flex-col justify-evenly rounded-lg p-4 backdrop-blur-md"
    >
      <h1 className="text-center text-3xl">FinApp</h1>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="email" className="px-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`rounded-t-md border-b-1 px-2 py-1 ${
            errors.email
              ? "rounded-md border-1 border-red-500"
              : "border-b-black"
          }`}
        />
        {errors.email && (
          <p className="pl-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="password" className="px-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`rounded-t-md border-b-1 px-2 py-1 autofill:bg-none ${
            errors.password
              ? "rounded-md border-1 border-red-500"
              : "border-b-black"
          }`}
        />
        {errors.password && (
          <p className="pl-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <PrimaryButton
        type="submit"
        disabled={!formData.email && !formData.password}
      >
        Login
      </PrimaryButton>
    </form>
  );
}

export default Login;
