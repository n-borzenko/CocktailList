import types from "../constants/search";
import { searchRequest } from "../api";

export const startSearch = (text = "") => async dispatch => {
    const response = await searchRequest(text);
    dispatch({
        type: types.SEARCH_COMPLETED,
        payload: {
            text,
            results: response.data.drinks,
        },
    });
};
