import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Spinner from "../../../shared/ui/Spinner/Spinner";

type LoginFormProps = {
  formData: { email: string; password: string };
  errors: { email?: string; password?: string };
  loginError: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const LoginForm = ({
  formData,
  errors,
  loginError,
  isLoading,
  onChange,
  onSubmit,
}: LoginFormProps) => (
  <form
    onSubmit={onSubmit}
    className="mx-auto flex w-[345px] flex-col justify-evenly gap-4 rounded-lg p-4 backdrop-blur-md"
  >
    <Input
      label="email"
      name="email"
      type="email"
      value={formData.email}
      error={errors.email}
      onChange={onChange}
    />
    <Input
      label="password"
      name="password"
      type="password"
      value={formData.password}
      error={errors.password}
      onChange={onChange}
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
