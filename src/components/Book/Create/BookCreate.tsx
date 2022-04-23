import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Author } from "../../../domain/author";
import BooksService from "../../../repository/books-repository";
import AuthorsService from "../../../repository/authors-repository";
import { BookCategory } from "../../../domain/book-category";

type FormData = {
    name: string;
    category: string;
    authorId: number;
}

function BookCreate() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        category: "",
        authorId: 1
    });

    useEffect(() => {
        AuthorsService.getAll().then(authors => setAuthors(authors.data));
    }, []);

    const handleInputChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        BooksService.createBook(formData).then(() => navigate("/books"));
    }

    return (
        <div className={"row mt-5 justify-content-center"}>
            <div className={"col-md-4"}>
                <form onSubmit={onSubmit}>
                    <div className={"form-group mt-2"}>
                        <label htmlFor={"name"}>Name</label>
                        <input
                            type={"text"}
                            id={"name"}
                            name={"name"}
                            className={"form-control"}
                            value={formData.name}
                            onChange={handleInputChange}
                            required/>
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor={"category"}>Category</label>
                        <select
                            id={"category"}
                            name={"category"}
                            className={"form-select"}
                            value={formData.category}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled hidden>Choose here</option>
                            {Object.keys(BookCategory).map(it => (
                                <option value={it} key={it}>{it}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor={"authorId"}>Author</label>
                        <select
                            id={"authorId"}
                            name={"authorId"}
                            className={"form-select"}
                            value={formData.authorId}
                            onChange={handleInputChange}
                            required>
                            <option value="" hidden>Choose here</option>
                            {authors.map(it => (
                                <option value={it.id} key={it.id}>{it.name} {it.surname}</option>
                            ))}
                        </select>
                    </div>
                    <button type={"submit"} className={"btn btn-success mt-4"}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookCreate;