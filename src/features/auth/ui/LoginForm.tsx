import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Spinner from "../../../shared/ui/Spinner/Spinner";

type LoginFormProps = {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  loginError: string;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LoginForm = ({
  formData,
  errors,
  loginError,
  isLoading,
  handleChange,
  handleSubmit,
}: LoginFormProps) => (
  <form
    onSubmit={handleSubmit}
    className="mx-auto flex w-[345px] flex-col justify-evenly gap-4 rounded-lg p-4 backdrop-blur-md"
    role="form"
  >
    <Input
      label="email"
      name="email"
      type="email"
      value={formData.email}
      error={errors.email}
      onChange={handleChange}
    />
    <Input
      label="password"
      name="password"
      type="password"
      value={formData.password}
      error={errors.password}
      onChange={handleChange}
    />
    {loginError && <p className="text-center text-red-500">{loginError}</p>}
    {!isLoading ? (
      <Button type="submit" disabled={!formData.email && !formData.password}>
        Login
      </Button>
    ) : (
      <Spinner />
    )}
  </form>
);

export default LoginForm;
