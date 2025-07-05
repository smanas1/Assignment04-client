import { createBrowserRouter } from "react-router";
import Books from "../pages/Books";
import App from "@/App";
import CreateBooks from "@/pages/CreateBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import SingleBook from "@/pages/SingleBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/create-book",
        Component: CreateBooks,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/books/:id",
        Component: SingleBook,
      },
    ],
  },
]);

export default router;
