import { formatTransactionDate } from "../formatTransactionDate";

describe("formatTransactionDate", () => {
  it("formats date correctly without timezone issues", () => {
    const input = new Date().toISOString().split("T")[0];
    const result = formatTransactionDate(input);

    const [year, month, day] = input.split("-");
    const expected = `${month}-${day}-${year}`;

    expect(result).toBe(expected);
  });

  it("formats 2025-06-26 correctly into MM-dd-yyyy", () => {
    const result = formatTransactionDate("2025-06-26");
    expect(result).toBe("06-26-2025");
  });

  it("formats 2024-02-29 correctly (leap year)", () => {
    const result = formatTransactionDate("2024-02-29");
    expect(result).toBe("02-29-2024");
  });
});
