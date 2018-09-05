import { push } from "connected-react-router";
import qs from "qs";

import types, { searchTypes } from "../constants/search";
import { searchByQueryRequest, searchByFilterRequest } from "../api";
import { searchURLByQuery, searchURLByFilter } from "../helpers/urls";
import locations from "../constants/locations";

const performSearchByQuery = async (dispatch, query) => {
    try {
        const response = await searchByQueryRequest(query);
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                type: searchTypes.query,
                query,
                results: response.data.drinks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const searchByQuery = (query = "") => dispatch => {
    dispatch(push(searchURLByQuery(query)));
    performSearchByQuery(dispatch, query);
};

const performSearchByFilter = async (dispatch, filter) => {
    try {
        const response = await searchByFilterRequest(filter);
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                type: searchTypes.filter,
                filter,
                results: response.data.drinks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const searchByFilter = (
    filter = { type: "categories", name: "Ordinary Drink" }
) => dispatch => {
    dispatch(push(searchURLByFilter(filter)));

    if (filter === null) {
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                type: searchTypes.filter,
                filter,
                results: [],
            },
        });
        return;
    }

    performSearchByFilter(dispatch, filter);
};

export const searchByURL = location => dispatch => {
    const parameters =
        location && location.search && location.search.length > 1
            ? qs.parse(location.search.substr(1))
            : null;
    console.log(parameters);
    if (location.pathname === locations.search) {
        if (parameters.query && parameters.query.length) {
            performSearchByQuery(dispatch, parameters.query);
        } else {
            dispatch(push(searchURLByQuery("")));
            performSearchByQuery(dispatch, "");
        }
    } else if (location.pathname === locations.searchByFilter) {
        if (
            !parameters.filter &&
            ["ingridients", "alcoholic", "category", "glass"].includes(
                parameters.filter.type
            )
        ) {
            //&& "category contains parameters.filter.name"
            performSearchByFilter(dispatch, parameters.filter);
        } else {
            dispatch(push(searchURLByFilter(null)));
            performSearchByFilter(dispatch, null);
        }
    } else {
        dispatch(push(searchURLByQuery("")));
        performSearchByQuery(dispatch, "");
    }
};
