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

const BooksTable = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  return (
    <div className="max-md:p-3">
      <div className="flex justify-between items-center max-md:p-2.5 xl:pe-24  md:pe-10  2xl:pe-40">
        <h1 className="font-bold text-2xl  md:mt-7">Books</h1>

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
                <TableCell>
                  <Badge className="bg-gray-700 dark:bg-gray-300">
                    {book.copies}
                  </Badge>
                </TableCell>
                <TableCell>
                  {book.available ? (
                    <Badge className="bg-emerald-600 " variant={"default"}>
                      Available
                    </Badge>
                  ) : (
                    <Badge variant={"destructive"}>Unavailable</Badge>
                  )}
                </TableCell>
                <TableCell className="flex">
                  <EditBookDialog bookData={book} />
                  <DeleteBookAlert bookId={book._id} />
                  <Link to={`/books/${book._id}`}>
                    <Button
                      size={"sm"}
                      className="bg-blue-500 hover:bg-blue-400"
                    >
                      Borrow
                    </Button>
                  </Link>
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
