import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import type { IBook } from "@/types/bookTypes";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";
import { toast, Toaster } from "sonner";

interface IBorrowFormProps {
  bookData: IBook;
}
const BorrowForm = ({ bookData }: IBorrowFormProps) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [borrowBook, { isLoading }] = useCreateBorrowMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await borrowBook({
        book: bookData._id,
        quantity,
        dueDate: date,
      }).unwrap();
      setDialogOpen(false);
      toast.success("Book borrowed successfully!", {
        duration: 5000,
        richColors: true,
      });
    } catch (error) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as any).data === "object" &&
        (error as any).data !== null &&
        "message" in (error as any).data
          ? ((error as any).data.message as string)
          : "An error occurred";
      toast.error(errorMessage, {
        duration: 7000,
        richColors: true,
      });
      console.log(error);
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form>
        <Toaster />
        <DialogTrigger asChild>
          <Button size={"sm"} className="bg-blue-500 hover:bg-indigo-300">
            Borrow
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription className="text-md text-center">
              Book Name: {bookData.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  value={quantity}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className=" justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {isLoading ? (
                <Button disabled className="bg-gray-500">
                  Borrowing...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-indigo-300"
                >
                  Borrow
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BorrowForm;
