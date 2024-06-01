export type Pagination = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type ApiResponse<T> = {
  results: T;
} & Pagination;

export type Book = {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  isLike: boolean;
  category: string;
  created_date: string;
};

export type Category = {
  id: number;
  title: string;
  image: string;
};

export type SearchBook = {
  title?: string;
  category_id?: string;
};
export type Lead = {
  name: string;
  number: string;
  text: string;
};
export type Settings = {
  logo: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  coordinate: string;
  linkMap: string;
  numberAdmin: string;
};
