import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function CreateBookForm() {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });

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

    console.log(formData);
    try {
      await createBook(formData).unwrap();
      toast.success("Book created successfully!", {
        duration: 5000,
        richColors: true,
      });
      setFormData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 0,
        available: true,
      });
      navigate("/books");
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
    <Card className="w-full max-w-sm">
      <Toaster />
      <CardHeader>
        <CardTitle>Create Your Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
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
            <Link to="/books" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Books
              </Button>
            </Link>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
