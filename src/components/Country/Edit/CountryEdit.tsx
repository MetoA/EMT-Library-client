import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CountriesService from "../../../repository/countries-repository";

type FormData = {
    name: string;
    continent: string;
}

function CountryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        continent: "",
    });

    useEffect(() => {
        CountriesService.findById(+id!).then(country => {
            setFormData({
                name: country.data.name,
                continent: country.data.continent,
            });
        }, () => navigate("/countries"));
    }, []);

    const handleInputChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        CountriesService.editCountry(+id!, formData).then(() => navigate("/countries"));
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

export default CountryEdit;