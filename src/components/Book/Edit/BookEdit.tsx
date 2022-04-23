import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import BooksService from "../../../repository/books-repository";
import { Author } from "../../../domain/author";
import { BookCategory } from "../../../domain/book-category";
import AuthorsService from "../../../repository/authors-repository";

type FormData = {
    name: string;
    category: string;
    authorId: number;
}

function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        category: "",
        authorId: 0
    });

    useEffect(() => {
        BooksService.findById(+id!).then(book => {
            setFormData({
                name: book.data.name,
                category: book.data.category,
                authorId: book.data.author.id
            });
        }, () => navigate("/books"));
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
        BooksService.editBook(+id!, formData).then(() => navigate("/books"));
    }

    return (
        <div className={"row mt-5 justify-content-center"}>
            <div className={"col-md-4"}>
                <form onSubmit={onSubmit}>
                    <div className={"form-group mt-2"}>
                        <label htmlFor={"id"}>Id</label>
                        <input
                            type={"text"}
                            id={"id"}
                            name={"id"}
                            className={"form-control"}
                            value={id}
                            disabled
                            required/>
                    </div>
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

export default BookEdit;