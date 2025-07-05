import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export function EditBookDialog({ bookData }: any) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: bookData.title,
    author: bookData.author,
    genre: bookData.genre,
    isbn: bookData.isbn,
    description: bookData.description,
    copies: bookData.copies,
    available: "",
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBook({
        _id: bookData._id,
        data: {
          ...formData,
          available: formData.available === "true" ? true : false,
        },
      }).unwrap();
      toast.success("Book updated successfully!", {
        duration: 5000,
        richColors: true,
      });

      setOpen(false);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as any).data === "object" &&
        (error as any).data !== null &&
        "errors" in (error as any).data &&
        (error as any).data.errors &&
        "_message" in (error as any).data.errors
      ) {
        toast.error((error as any).data.errors._message, {
          duration: 10000,
          richColors: true,
          description: (error as any).data.message,
        });
      } else {
        toast.error("An unknown error occurred.", {
          duration: 10000,
          richColors: true,
        });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <div>
        <DialogTrigger asChild>
          <Button className="bg-amber-500 hover:bg-amber-300" size={"sm"}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Make changes to the book details here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Card className="w-full max-w-sm">
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      name="title"
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="author">Author</Label>
                    </div>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={handleChange}
                      name="author"
                      type="text"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="genre">Genre</Label>
                    </div>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, genre: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="FICTION">FICTION</SelectItem>
                          <SelectItem value="NON_FICTION">
                            NON_FICTION
                          </SelectItem>
                          <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                          <SelectItem value="HISTORY">HISTORY</SelectItem>
                          <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                          <SelectItem value="FANTASY">FANTASY</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="isbn">ISBN</Label>
                    </div>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      name="isbn"
                      type="number"
                      placeholder="Enter ISBN number"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="description">Description</Label>
                    </div>
                    <Textarea
                      value={formData.description}
                      onChange={handleChange}
                      name="description"
                      id="description"
                      placeholder="Enter book description"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="copies">Copies</Label>
                    </div>
                    <Input
                      id="copies"
                      value={formData.copies || "1"}
                      onChange={handleChange}
                      name="copies"
                      type="number"
                      placeholder="Enter number of copies"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="availability">Availability</Label>
                    </div>
                    <Select
                      value={formData.available ? "true" : "false"}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, available: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardFooter className="flex-col gap-2 w-full">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  )}

                  <DialogClose asChild>
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </div>
    </Dialog>
  );
}
