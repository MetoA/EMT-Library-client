import axios from '../axios/axios';
import { Author } from "../domain/author";
import { CreateEditAuthorRequest } from "../domain/requests/create-edit-author-request";

const AuthorsService = {
    findById: (id: number) => axios.get<Author>(`/api/authors/${id}`),
    getAll: () => axios.get<Author[]>(`/api/authors`),
    getPaged: (page: number, size: number) =>
        axios.get<Author[]>(`/api/authors/paged?page=${page}&size=${size}`),
    getSize: () => axios.get<number>(`/api/authors/size`),
    createAuthor: (request: CreateEditAuthorRequest) => axios.post<Author>(`/api/authors/create`, request),
    editAuthor: (id: number, request: CreateEditAuthorRequest) => axios.put(`/api/authors/${id}/edit`, request),
    deleteAuthor: (id: number) => axios.delete(`/api/authors/${id}/delete`)
}

export default AuthorsService;