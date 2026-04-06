/* Módulo OMDBWrapper*/
import axios from "axios";
const APIKEY = "324e9101"; // MI APIKEY
const BASE_URL = "http://www.omdbapi.com/?apikey=" + APIKEY
    
const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    let urlFinal = `${BASE_URL}&s=${searchText}&page=${page}`
    returnObject = await axios.get(urlFinal)

    return returnObject.data;
};
const OMDBSearchComplete = async (searchText) => {
    let vectorFinal = [];
    let urlPre = `${BASE_URL}&s=${searchText}&page=1`;


    let primeraRespuesta = await axios.get(urlPre);
    let totalPages = parseInt(primeraRespuesta.data.totalResults, 10); 
    for (let i = 1; i <= totalPages; i++) {
        let urlFinal = `${BASE_URL}&s=${searchText}&page=${i}`;
        let respuesta = await axios.get(urlFinal);
        if (respuesta.data.Response === "False") {
            break; 
        }
        vectorFinal = vectorFinal.concat(respuesta.data.Search); 
    }

    return vectorFinal; 
};
const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: {}
    };
    let urlFinal = `${BASE_URL}&i=${imdbID}`;
    returnObject = await axios.get(urlFinal)
    return returnObject.data;
};
export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
