import { DropdownMenu } from "../../../shared/ui/DropdownMenu";

export const Header = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between rounded-b-lg bg-white/80 p-4 shadow-sm backdrop-blur">
      <h1 className="text-title text-2xl font-bold">Finapp</h1>
      <DropdownMenu />
    </header>
  );
};
