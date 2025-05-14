import { Field, ErrorMessage } from "formik";

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

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      {as === "select" ? (
        <Field
          as="select"
          name={name}
          id={name}
          onKeyDown={handleKeyDown}
          className="rounded-md rounded-t-md rounded-b-none border-1 border-b-1 border-black px-2 py-1 focus:ring-0 focus:outline-none"
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          id={name}
          onKeyDown={handleKeyDown}
          className="rounded-t-md border-b-1 px-2 py-1 focus:rounded-md focus:border-1 focus:border-black focus:ring-0 focus:outline-none"
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
