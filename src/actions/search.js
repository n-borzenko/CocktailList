import axios from "axios";

import types from "../constants/search";

export const startSearch = text => (dispatch, getState) => {
    axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`)
        .then(response => {
            console.log(response);
            dispatch({
                type: types.SEARCH_COMPLETED,
                payload: {
                    text,
                    results: response.data.drinks,
                },
            });
        })
        .catch(error => console.log(error));
};
