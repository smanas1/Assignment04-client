import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Loader2 } from "lucide-react";
import DeleteBookAlert from "./DeleteBookAlert";
import { Link } from "react-router";
import { EditBookDialog } from "./EditBookDialog";
import BorrowForm from "../borrow/BorrowForm";

const BooksTable = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  return (
    <div>
      <div className="flex justify-between items-center pe-40">
        <h1 className="font-bold text-2xl mt-7">Books</h1>

        <Link to="/create-book">
          <Button>Add New Book</Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 size={50} className="animate-spin" />
        </div>
      ) : (
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.data ?? []).map((book: any) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available ? (
                    <Badge variant={"default"}>Available</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Unavailable</Badge>
                  )}
                </TableCell>
                <TableCell className="flex">
                  <EditBookDialog bookData={book} />
                  <DeleteBookAlert bookId={book._id} />
                  <BorrowForm bookData={book} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BooksTable;
