import React, { useEffect, useState } from 'react';
import { Book } from "../../domain/book";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faCircleXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import BooksService from "../../repository/books-repository";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageCount, setPageCount] = useState<number>(0);

    const addCopy = async (id: number, index: number) => {
        await BooksService.addCopy(id);
        const newBooks = [...books];
        newBooks[index].availableCopies++;
        setBooks(newBooks);
    }

    const markAsTaken = async (id: number, index: number) => {
        await BooksService.markAsTaken(id);
        const newBooks = [...books];
        newBooks[index].availableCopies--;
        setBooks(newBooks);
    }

    const deleteBook = async (id: number, index: number) => {
        await BooksService.deleteBook(id);
        const newBooks = [...books];
        newBooks.splice(index, 1);
        setBooks(newBooks);
    }

    const getPaged = async (page: number, size: number) => {
        const books = await BooksService.getPaged(page, size);
        setBooks(books.data);
    }

    const getBooksSize = async () => {
        const size = await BooksService.getSize();
        setPageCount(Math.ceil(size.data / pageSize));
    }

    const handlePageClick = (event: { selected: number }) => setPage(event.selected);

    useEffect(() => {
        getBooksSize();
    }, [])

    useEffect(() => {
        getPaged(page, pageSize);
    }, [page, pageSize]);


    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped table-bordered"}>
                        <thead>
                        <tr>
                            <th scope={"col"} className={"text-center"}>ID</th>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"} className={"text-center"}>Category</th>
                            <th scope={"col"}>Author</th>
                            <th scope={"col"} className={"text-center"}>Copies Left</th>
                            <th scope={"col"} className={"text-center"}>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td className={"text-center align-middle"}>{book.id}</td>
                                <td className={"align-middle"}>{book.name}</td>
                                <td className={"text-center align-middle"}>{book.category}</td>
                                <td className={"align-middle"}>{book.author.name} {book.author.surname}</td>
                                <td className={"text-center align-middle"}>{book.availableCopies}</td>
                                <td className={"text-center align-middle"}>
                                    <button className={"btn m-1"} disabled={book.availableCopies < 1}
                                            onClick={() => markAsTaken(book.id, index)}>
                                        <FontAwesomeIcon icon={faCircleMinus} className="text-warning"/>
                                    </button>
                                    <button className={"btn m-1"} onClick={() => addCopy(book.id, index)}>
                                        <FontAwesomeIcon icon={faCirclePlus} className="text-success"/>
                                    </button>
                                    <Link className={"btn m-1"} to={`/books/${book.id}/edit`}>
                                        <FontAwesomeIcon icon={faPencil} className="text-success"/>
                                    </Link>
                                    <button className={"btn m-1"} onClick={() => deleteBook(book.id, index)}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="text-danger"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Link to={"/books/create"} className={"btn btn-success"}>
                        Create Book
                    </Link>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName={"pagination justify-content-center"}
                        activeClassName="active"
                        renderOnZeroPageCount={() => null}
                    />
                </div>
            </div>
        </div>
    );
}

export default BookList;