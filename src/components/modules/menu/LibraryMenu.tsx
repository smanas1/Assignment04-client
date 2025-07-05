import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Link } from "react-router";
export function LibraryMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/books">All Books</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/create-book">Add Book</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/borrow-summary">Borrow Summary</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
