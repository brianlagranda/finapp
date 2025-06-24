import { Field, ErrorMessage, useField } from "formik";

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  as?: "input" | "select";
  options?: Option[];
}

const FormField = ({
  name,
  label,
  type = "text",
  as = "input",
  options = [],
}: FormFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const [field] = useField(name);

  const baseInputClass =
    "rounded-md px-2 border py-1 focus:border-black focus:ring-0 focus:outline-none";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      {as === "select" ? (
        <Field
          as="select"
          name={name}
          id={name}
          onKeyDown={handleKeyDown}
          className={baseInputClass}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Field>
      ) : (
        <input
          {...field}
          type={type}
          name={name}
          id={name}
          onKeyDown={handleKeyDown}
          value={field.value ?? ""}
          className={baseInputClass}
        />
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default FormField;
