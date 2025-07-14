import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../../shared/ui/Button";
import FormField from "../../../shared/ui/FormField";
import useTransactionStore from "../model/useTransactionStore";
import { Transaction } from "../model/types";
import { categories } from "../../../shared/constants/categories";

type TransactionFormProps = {
  mode: "create" | "edit";
  initialData?: Transaction;
};

type TransactionFormValues = Omit<Transaction, "id">;

const validCategoryValues = categories.map((category) => category.value);

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
    .oneOf(validCategoryValues)
    .required("Category is required"),
  date: Yup.string().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = ({ mode, initialData }: TransactionFormProps) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  const isEditing = mode === "edit";

  const initialValues: TransactionFormValues =
    isEditing && initialData
      ? {
          title: initialData.title ?? "",
          type: initialData.type ?? "expense",
          amount: initialData.amount ? Math.abs(initialData.amount) : 0,
          date: initialData.date ?? new Date().toISOString().split("T")[0],
          category: initialData.category ?? "food",
          description: initialData.description ?? "",
        }
      : {
          title: "",
          type: "income",
          amount: 0,
          date: new Date().toISOString().split("T")[0],
          category: "food",
          description: "",
        };

  return (
    <Formik<TransactionFormValues>
      initialValues={initialValues}
      validationSchema={TransactionSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (isEditing && initialData) {
          updateTransaction({
            ...initialData,
            ...values,
          });
        } else {
          addTransaction({
            ...values,
            title: values.title.trim(),
            description: values.description?.trim(),
            id: crypto.randomUUID(),
          });
        }

        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto flex w-[345px] flex-col justify-evenly gap-4 rounded-lg bg-white/60 p-4 backdrop-blur-md">
          <h2>{isEditing ? "Edit transaction" : "Create new transaction"}</h2>
          <FormField name="title" label="Title" />
          <FormField
            name="type"
            label="Type"
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
            label="Category"
            as="select"
            options={categories}
          />
          <FormField name="date" label="Date" type="date" />
          <FormField name="description" label="Description" />

          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? "Save" : "Create"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
