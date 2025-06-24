import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";

export const DropdownMenu = () => {
  return (
    <Menu>
      <MenuButton
        className={"hover:bg-btn-secondary-hover cursor-pointer rounded-md p-2"}
      >
        My account
      </MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
