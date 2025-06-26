import { format, parse } from "date-fns";

export function formatTransactionDate(input: string): string {
  const parsed = parse(input, "yyyy-MM-dd", new Date());
  return format(parsed, "MM-dd-yyyy");
}
