import React from 'react';
import './App.css';
import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import BookList from "../Book/BookList";
import BookCreate from "../Book/Create/BookCreate";
import BookEdit from "../Book/Edit/BookEdit";
import AuthorList from "../Author/AuthorList";
import AuthorCreate from "../Author/Create/AuthorCreate";
import AuthorEdit from "../Author/Edit/AuthorEdit";
import CountryList from "../Country/CountryList";
import CountryCreate from "../Country/Create/CountryCreate";
import CountryEdit from "../Country/Edit/CountryEdit";

const LibraryRoutes = () => useRoutes([
    {
        path: "/",
        element: <BookList/>
    },
    {
        path: "/books",
        element: <BookList/>,
    },
    {
        path: "/books/create",
        element: <BookCreate/>
    },
    {
        path: "/books/:id/edit",
        element: <BookEdit/>
    },
    {
        path: "/authors",
        element: <AuthorList/>
    },
    {
        path: "/authors/create",
        element: <AuthorCreate/>
    },
    {
        path: "/authors/:id/edit",
        element: <AuthorEdit/>
    },
    {
        path: "/countries",
        element: <CountryList/>
    },
    {
        path: "/countries/create",
        element: <CountryCreate/>
    },
    {
        path: "/countries/:id/edit",
        element: <CountryEdit/>
    },
]);

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <main>
                <div className="container">
                    <LibraryRoutes/>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
