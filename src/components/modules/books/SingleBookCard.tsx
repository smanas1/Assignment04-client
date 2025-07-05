import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/bookTypes";
import { useParams } from "react-router";
import BorrowForm from "../borrow/BorrowForm";

const SingleBookCard = () => {
  const { id } = useParams<{ id?: string }>();
  const { data } = useGetSingleBookQuery(id ?? "");

  const Book: IBook | undefined = Array.isArray(data?.data)
    ? data?.data[0]
    : data?.data;

  return (
    <Card className="w-96 mx-auto text-center mt-10">
      {Book ? (
        <>
          <CardHeader>
            <CardTitle className="text-lg  font-bold">{Book?.title}</CardTitle>
            <h1>By {Book?.author}</h1>
            <CardDescription className="italic">
              "{Book?.description}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                <strong>Genre:</strong> {Book?.genre}
              </p>
              <p>
                <strong>ISBN:</strong> {Book?.isbn}
              </p>
              <p>
                <strong>Copies:</strong> {Book?.copies}
              </p>
              <p>
                <strong>Available: </strong>
                {Book?.available ? "Yes" : "No"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            {Book && <BorrowForm bookData={Book} />}
          </CardFooter>
        </>
      ) : (
        <h1>Your book is not available</h1>
      )}
    </Card>
  );
};

export default SingleBookCard;
