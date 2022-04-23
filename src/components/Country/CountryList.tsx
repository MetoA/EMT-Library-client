import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Country } from "../../domain/country";
import CountriesService from "../../repository/countries-repository";

function CountryList() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageCount, setPageCount] = useState<number>(0);

    const deleteCountry = async (id: number, index: number) => {
        await CountriesService.deleteCountry(id);
        const newCountries = [...countries];
        newCountries.splice(index, 1);
        setCountries(newCountries);
    }

    const getPaged = async (page: number, size: number) => {
        const countries = await CountriesService.getPaged(page, size);
        setCountries(countries.data);
    }

    const getCountriesSize = async () => {
        const size = await CountriesService.getSize();
        setPageCount(Math.ceil(size.data / pageSize));
    }

    const handlePageClick = (event: { selected: number }) => setPage(event.selected);

    useEffect(() => {
        getCountriesSize();
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
                            <th scope={"col"}>Continent</th>
                            <th scope={"col"} className={"text-center"}>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countries.map((country, index) => (
                            <tr key={country.id}>
                                <td className={"text-center align-middle"}>{country.id}</td>
                                <td className={"align-middle"}>{country.name}</td>
                                <td className={"align-middle"}>{country.continent}</td>
                                <td className={"text-center align-middle"}>
                                    <Link className={"btn m-1"} to={`/countries/${country.id}/edit`}>
                                        <FontAwesomeIcon icon={faPencil} className="text-success"/>
                                    </Link>
                                    <button className={"btn m-1"} onClick={() => deleteCountry(country.id, index)}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="text-danger"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Link to={"/countries/create"} className={"btn btn-success"}>
                        Create Country
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

export default CountryList;