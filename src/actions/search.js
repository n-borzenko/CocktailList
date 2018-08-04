import types from "../constants/search";
import { searchRequest } from "../api";

export const startSearch = text => dispatch => {
    const value = text ? text : "";
    searchRequest(value).then(response =>
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                text,
                results: response.data.drinks,
            },
        })
    );
};
