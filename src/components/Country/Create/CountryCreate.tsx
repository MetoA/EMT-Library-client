import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CountriesService from "../../../repository/countries-repository";

type FormData = {
    name: string;
    continent: string;
}

function CountryCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        continent: "",
    });

    const handleInputChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        CountriesService.createCountry(formData).then(() => navigate("/countries"));
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
                        <label htmlFor={"continent"}>Continent</label>
                        <input
                            type={"text"}
                            id={"continent"}
                            name={"continent"}
                            className={"form-control"}
                            value={formData.continent}
                            onChange={handleInputChange}
                            required/>
                    </div>
                    <button type={"submit"} className={"btn btn-success mt-4"}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CountryCreate;