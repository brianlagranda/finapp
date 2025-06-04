import useTransactionStore from "../model/useTransactionStore";
import { act } from "@testing-library/react";
import { Transaction } from "../model/types";

beforeEach(() => {
  useTransactionStore.setState({ transactions: [] });
});

describe("useTransactionStore", () => {
  it("adds a transaction with provided ID", () => {
    const transaction = {
      id: "abc123",
      title: "Salary",
      amount: 1000,
      type: "income",
      date: "2025-05-20",
      category: "Job",
    };

    act(() => {
      useTransactionStore.getState().addTransaction(transaction as Transaction);
    });

    const transactions = useTransactionStore.getState().transactions;
    expect(transactions).toHaveLength(1);
    expect(transactions[0].id).toBe("abc123");
  });

  it("adds a transaction and generates an ID if not provided", () => {
    const transaction = {
      title: "Freelance",
      amount: 2000,
      type: "income",
      date: "2025-05-20",
      category: "Work",
    };

    act(() => {
      useTransactionStore.getState().addTransaction(transaction as Transaction);
    });

    const transactions = useTransactionStore.getState().transactions;
    expect(transactions).toHaveLength(1);
    expect(transactions[0].id).toBeDefined();
    expect(typeof transactions[0].id).toBe("string");
  });

  it("deletes a transaction by ID", () => {
    const transaction: Transaction = {
      id: "to-delete",
      title: "Groceries",
      amount: 100,
      type: "expense",
      date: "2025-05-20",
      category: "Food",
    };

    const store = useTransactionStore.getState();

    act(() => {
      store.addTransaction(transaction);
      store.deleteTransaction("to-delete");
    });

    const transactions = store.transactions;
    expect(transactions).toHaveLength(0);
  });

  it("calculates the correct balance", () => {
    const store = useTransactionStore.getState();

    act(() => {
      store.addTransaction({
        id: "1",
        title: "Salary",
        amount: 3000,
        type: "income",
        date: "2025-05-20",
        category: "Job",
      });

      store.addTransaction({
        id: "2",
        title: "Rent",
        amount: 1000,
        type: "expense",
        date: "2025-05-20",
        category: "Home",
      });
    });

    const balance = store.getBalance();
    expect(balance).toBe(2000);
  });
});
