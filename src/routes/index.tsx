import { createBrowserRouter } from "react-router";
import Books from "../pages/Books";
import App from "@/App";
import CreateBooks from "@/pages/CreateBooks";
import BorrowSummary from "@/pages/BorrowSummary";

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
    ],
  },
]);

export default router;
