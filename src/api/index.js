import axios from "axios";

import api from "./constants";

export const searchRequest = (text, onSuccess, onError) => {
    const query = `${api.ENDPOINT}${api.APIKEY}${api.Methods.SEARCH}${text}`;
    axios
        .get(query)
        .then(onSuccess)
        .catch(onError);
};
