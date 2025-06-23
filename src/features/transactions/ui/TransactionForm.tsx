import { Formik, Form } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

import Button from "../../../shared/ui/Button";
import FormField from "../../../shared/ui/FormField";
import useTransactionStore from "../model/useTransactionStore";
import { TransactionType } from "../model/types";

const validCategories = [
  "food",
  "transport",
  "housing",
  "utilities",
  "health",
  "entertainment",
  "shopping",
  "education",
  "travel",
  "gift",
  "salary",
  "freelance",
  "investment",
  "other",
];

const TransactionSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  type: Yup.string()
    .oneOf(["income", "expense"], "Invalid type")
    .required("type is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  category: Yup.string()
    .oneOf(validCategories)
    .required("Category is required"),
  date: Yup.string().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  return (
    <Formik
      initialValues={{
        title: "",
        type: "income",
        amount: null,
        date: new Date().toISOString().split("T")[0],
        category: "food",
        description: "",
      }}
      validationSchema={TransactionSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const formattedDate = format(new Date(values.date), "MM-dd-yyyy");

          const newTransaction = {
            ...values,
            id: crypto.randomUUID(),
            type: values.type as TransactionType,
            title: values.title.trim(),
            description: values.description.trim(),
            amount: Number(values.amount),
            date: formattedDate,
          };

          addTransaction(newTransaction);

          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto flex w-[345px] flex-col justify-evenly gap-4 rounded-lg bg-white/60 p-4 backdrop-blur-md">
          <FormField name="title" label="Title" />
          <FormField
            name="type"
            label="type"
            as="select"
            options={[
              {
                label: "Income",
                value: "income",
              },
              { label: "Expense", value: "expense" },
            ]}
          />
          <FormField name="amount" label="Amount" type="number" />
          <FormField
            name="category"
            label="category"
            as="select"
            options={[
              { label: "Food", value: "food" },
              { label: "Transport", value: "transport" },
              { label: "Housing", value: "housing" },
              { label: "Utilities", value: "utilities" },
              { label: "Health", value: "health" },
              { label: "Entertainment", value: "entertainment" },
              { label: "Shopping", value: "shopping" },
              { label: "Education", value: "education" },
              { label: "Travel", value: "travel" },
              { label: "Gift", value: "gift" },
              { label: "Salary", value: "salary" },
              { label: "Freelance", value: "freelance" },
              { label: "Investment", value: "investment" },
              { label: "Other", value: "other" },
            ]}
          />
          <FormField name="date" label="Date" type="date" />
          <FormField name="description" label="Description" />

          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
