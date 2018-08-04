import loader from "../loader";
import api from "./constants";

export const searchRequest = text => {
    const query = `${api.ENDPOINT}${api.APIKEY}${api.Methods.SEARCH}${text}`;
    return new Promise((resolve, reject) => {
        loader.get(query).then(data => resolve(data), error => reject(error));
    });
};
