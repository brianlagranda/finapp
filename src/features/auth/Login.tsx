import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";

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

      <FormInput
        label={"email"}
        name={"email"}
        type={"email"}
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
      />

      <FormInput
        label={"password"}
        name={"password"}
        type={"password"}
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
      />

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
