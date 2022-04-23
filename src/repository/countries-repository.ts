import axios from '../axios/axios';
import { Country } from "../domain/country";
import { CreateEditCountryRequest } from "../domain/requests/create-edit-country-request";

const CountriesService = {
    findById: (id: number) => axios.get<Country>(`/api/countries/${id}`),
    getAll: () => axios.get<Country[]>(`/api/countries`),
    getPaged: (page: number, size: number) =>
        axios.get<Country[]>(`/api/countries/paged?page=${page}&size=${size}`),
    getSize: () => axios.get<number>(`/api/countries/size`),
    createCountry: (request: CreateEditCountryRequest) => axios.post<Country>(`/api/countries/create`, request),
    editCountry: (id: number, request: CreateEditCountryRequest) => axios.put(`/api/countries/${id}/edit`, request),
    deleteCountry: (id: number) => axios.delete(`/api/countries/${id}/delete`)
}

export default CountriesService;