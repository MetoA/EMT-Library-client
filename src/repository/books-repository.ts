import axios from '../axios/axios';
import { CreateEditBookRequest } from "../domain/requests/create-edit-book-request";
import { Book } from "../domain/book";

const BooksService = {
    findById: (id: number) => axios.get<Book>(`/api/books/${id}`),
    getPaged: (page: number, size: number) =>
        axios.get<Book[]>(`/api/books/paged?page=${page}&size=${size}`),
    getSize: () => axios.get<number>(`/api/books/size`),
    createBook: (request: CreateEditBookRequest) => axios.post<Book>(`/api/books/create`, request),
    editBook: (id: number, request: CreateEditBookRequest) => axios.put(`/api/books/${id}/edit`, request),
    markAsTaken: (id: number) => axios.put(`/api/books/${id}/mark_as_taken`),
    addCopy: (id: number) => axios.put(`/api/books/${id}/add_copy`),
    deleteBook: (id: number) => axios.delete(`/api/books/${id}/delete`)
}

export default BooksService;