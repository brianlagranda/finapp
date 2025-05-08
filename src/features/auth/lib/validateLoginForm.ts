type LoginFormData = {
  email: string;
  password: string;
};

export const validateLoginForm = (formData: LoginFormData) => {
  const errors: Partial<LoginFormData> = {};

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "Please enter valid email";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Your password length is too short";
  }

  return errors;
};
