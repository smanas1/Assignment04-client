import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/api/baseApi";
import { Loader2 } from "lucide-react";

interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

const BorrowSummaryTable = () => {
  const { data, isLoading } = useGetBorrowQuery(undefined);
  console.log(data?.data);
  return (
    <Table className="mt-7 w-1/2 mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Book Title</TableHead>
              <TableHead className="font-medium">ISBN</TableHead>
              <TableHead className="font-medium text-center">
                Total Quantity Borrowed
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.data as BorrowSummaryItem[] | undefined)?.map(
              (item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.book.title}
                  </TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell className="text-center">
                    {item.totalQuantity}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </>
      )}
    </Table>
  );
};

export default BorrowSummaryTable;
