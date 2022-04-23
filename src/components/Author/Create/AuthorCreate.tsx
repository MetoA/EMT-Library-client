import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Country } from "../../../domain/country";
import AuthorsService from "../../../repository/authors-repository";
import CountriesService from "../../../repository/countries-repository";

type FormData = {
    name: string;
    surname: string;
    countryId: number;
}

function AuthorCreate() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<Country[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        surname: "",
        countryId: 0
    });

    useEffect(() => {
        CountriesService.getAll().then(countries => setCountries(countries.data));
    }, []);

    const handleInputChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        AuthorsService.createAuthor(formData).then(() => navigate("/authors"));
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
                        <label htmlFor={"surname"}>Surname</label>
                        <input
                            type={"text"}
                            id={"surname"}
                            name={"surname"}
                            className={"form-control"}
                            value={formData.surname}
                            onChange={handleInputChange}
                            required/>
                    </div>
                    <div className={"form-group mt-2"}>
                        <label htmlFor={"countryId"}>Country</label>
                        <select
                            id={"countryId"}
                            name={"countryId"}
                            className={"form-select"}
                            value={formData.countryId}
                            onChange={handleInputChange}
                            required>
                            <option value="" hidden>Choose here</option>
                            {countries.map(it => (
                                <option value={it.id} key={it.id}>{it.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type={"submit"} className={"btn btn-success mt-4"}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AuthorCreate;