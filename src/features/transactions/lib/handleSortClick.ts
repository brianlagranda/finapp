type SortKey = string | null;
type SortDirection = "asc" | "desc";

interface SortHandlers {
  setSortKey: (key: SortKey) => void;
  setSortDirection: (dir: SortDirection) => void;
  toggleSortDirection: () => void;
}

export function handleSortClick(
  clickedKey: SortKey,
  currentSortKey: SortKey,
  handlers: SortHandlers,
) {
  if (clickedKey === currentSortKey) {
    handlers.toggleSortDirection();
  } else {
    handlers.setSortKey(clickedKey);
    handlers.setSortDirection("desc");
  }
}
