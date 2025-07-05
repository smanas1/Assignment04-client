export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EditDataType = Pick<
  IBook,
  "title" | "author" | "genre" | "isbn" | "description" | "copies"
>;
