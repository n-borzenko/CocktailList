import types from "../constants/search";
import { searchRequest } from "../api";

export const startSearch = (text = "") => dispatch => {
    searchRequest(text).then(response =>
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                text,
                results: response.data.drinks,
            },
        })
    );
};
