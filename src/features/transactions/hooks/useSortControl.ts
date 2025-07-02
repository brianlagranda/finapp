import { SortKey } from "../model/types";
import useTransactionStore from "../model/useTransactionStore";

export function useSortControl() {
  const sortKey = useTransactionStore((s) => s.sortKey);
  const setSortKey = useTransactionStore((s) => s.setSortKey);
  const sortDirection = useTransactionStore((s) => s.sortDirection);
  const setSortDirection = useTransactionStore((s) => s.setSortDirection);

  const handleHeaderClick = (clickedKey: SortKey) => {
    if (clickedKey === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(clickedKey);
      setSortDirection("desc");
    }
  };

  return { sortKey, sortDirection, handleHeaderClick };
}
