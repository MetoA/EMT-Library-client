import { BookCategory } from "./book-category";
import { Author } from "./author";

export interface Book {
    id: number;
    name: string;
    category: BookCategory;
    author: Author;
    availableCopies: number;
}