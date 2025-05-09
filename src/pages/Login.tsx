import { Navigate } from "react-router";

import authStore from "../features/auth/model/authStore";
import { useLoginForm } from "../features/auth/model/useLoginForm";

import LoginForm from "../features/auth/ui/LoginForm";

const Login = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const {
    formData,
    errors,
    isLoading,
    loginError,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <h1 className="py-4 text-center text-3xl">FinApp</h1>
      <LoginForm
        formData={formData}
        errors={errors}
        loginError={loginError}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
