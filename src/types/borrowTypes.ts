interface IBorrow {
  _id: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowResponse {
  _id: string;
  data: string;
}
export type CreateBorrowInput = {
  book: string;
  quantity: number;
  dueDate: Date | undefined;
};

export interface IBorrowData {
  data?: IBorrow[];
}
