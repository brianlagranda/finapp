import { render, screen } from "@testing-library/react";
import { Balance } from "../Balance";
import useTransactionStore from "../../../transactions/model/useTransactionStore";
import { Transaction } from "../../../transactions/model/types";
import { act } from "@testing-library/react";

beforeEach(() => {
  useTransactionStore.setState({ transactions: [] });
});

describe("<Balance />", () => {
  it("should display green text balance when it's positive", () => {
    const addTransaction = useTransactionStore.getState().addTransaction;

    const transaction = {
      id: "abc123",
      title: "Salary",
      amount: 1000,
      type: "income",
      date: "2025-05-20",
      category: "Job",
    };

    act(() => {
      addTransaction(transaction as Transaction);
    });

    render(<Balance />);

    const balanceText = screen.getByText("$1,000.00");

    expect(balanceText).toHaveClass("text-green-700");
  });

  it("should display red text balance when it's negative", () => {
    const addTransaction = useTransactionStore.getState().addTransaction;

    const transaction = {
      id: "abc456",
      title: "Salary",
      amount: 1000,
      type: "expense",
      date: "2025-05-20",
      category: "Job",
    };

    act(() => {
      addTransaction(transaction as Transaction);
    });

    render(<Balance />);

    const balanceText = screen.getByText("-$1,000.00");

    expect(balanceText).toHaveClass("text-red-600");
  });
});
