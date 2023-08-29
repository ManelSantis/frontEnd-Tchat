import axios from 'axios';

export function getCountries() {
    return axios.get("https://servicodados.ibge.gov.br/api/v1/paises/{paises}")
}