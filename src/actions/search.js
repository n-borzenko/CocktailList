import types from "../constants/search";
import { searchRequest } from "../api";

export const startSearch = text => (dispatch, getState) => {
    searchRequest(text, response =>
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                text,
                results: response.data.drinks,
            },
        })
    );
};
