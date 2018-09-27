import { push } from "connected-react-router";
import qs from "qs";

import types from "../constants/search";
import locations from "../constants/locations";
import { searchRequest } from "../api";

export const startSearch = (text = "") => async dispatch => {
    const parameters = qs.stringify({ text });
    dispatch(push(`${locations.search}?${parameters}`));

    try {
        const response = await searchRequest(text);
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                text,
                results: response.data.drinks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
