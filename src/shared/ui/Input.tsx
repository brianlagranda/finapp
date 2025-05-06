interface FormInputProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={name} className="px-1">
        {label}
      </label>
      <input
        {...props}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded-t-md border-b-1 px-2 py-1 focus:rounded-md focus:border-1 focus:border-black focus:ring-0 focus:outline-none ${
          error ? "rounded-md border-1 border-red-500" : "border-b-black"
        }`}
      />
      {error && <p className="pl-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FormInput;
