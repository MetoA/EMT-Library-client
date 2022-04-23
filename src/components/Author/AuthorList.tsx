import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Author } from "../../domain/author";
import AuthorsService from "../../repository/authors-repository";

function AuthorList() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageCount, setPageCount] = useState<number>(0);

    const deleteAuthor = async (id: number, index: number) => {
        await AuthorsService.deleteAuthor(id);
        const newAuthors = [...authors];
        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    }

    const getPaged = async (page: number, size: number) => {
        const authors = await AuthorsService.getPaged(page, size);
        setAuthors(authors.data);
    }

    const getAuthorsSize = async () => {
        const size = await AuthorsService.getSize();
        setPageCount(Math.ceil(size.data / pageSize));
    }

    const handlePageClick = (event: { selected: number }) => setPage(event.selected);

    useEffect(() => {
        getAuthorsSize();
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
                            <th scope={"col"}>Surname</th>
                            <th scope={"col"}>Country</th>
                            <th scope={"col"} className={"text-center"}>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {authors.map((author, index) => (
                            <tr key={author.id}>
                                <td className={"text-center align-middle"}>{author.id}</td>
                                <td className={"align-middle"}>{author.name}</td>
                                <td className={"align-middle"}>{author.surname}</td>
                                <td className={"align-middle"}>{author.country.name}</td>
                                <td className={"text-center align-middle"}>
                                    <Link className={"btn m-1"} to={`/authors/${author.id}/edit`}>
                                        <FontAwesomeIcon icon={faPencil} className="text-success"/>
                                    </Link>
                                    <button className={"btn m-1"} onClick={() => deleteAuthor(author.id, index)}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="text-danger"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Link to={"/authors/create"} className={"btn btn-success"}>
                        Create Author
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

export default AuthorList;