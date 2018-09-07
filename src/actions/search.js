import { push } from "connected-react-router";
import qs from "qs";
import axios from "axios";

import types, { searchTypes } from "../constants/search";
import { searchByQueryRequest, searchByFilterRequest } from "../api";
import locations from "../constants/locations";

const searchURLByQuery = query => {
    const parameters =
        query && query.length
            ? qs.stringify({
                  query,
              })
            : "";
    return `${locations.search}?${parameters}`;
};

const searchURLByFilter = filter => {
    const parameters = filter ? qs.stringify(filter) : "";
    return `${locations.searchByFilter}?${parameters}`;
};

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
        if (axios.isCancel(error)) {
            return;
        }
        console.log(error);
    }
};

const performSearchByFilter = async (dispatch, filter) => {
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

export const searchURLFromState = state => {
    if (state.type === searchTypes.filter) {
        return searchURLByFilter(state.filter);
    } else {
        return searchURLByQuery(state.query);
    }
};

export const searchByQuery = (query = "") => dispatch => {
    dispatch(push(searchURLByQuery(query)));
    performSearchByQuery(dispatch, query);
};

export const searchByFilter = (
    filter = { type: "categories", name: "Ordinary Drink" }
) => dispatch => {
    dispatch(push(searchURLByFilter(filter)));
    performSearchByFilter(dispatch, filter);
};

export const searchByURL = location => dispatch => {
    const parameters =
        location && location.search && location.search.length > 1
            ? qs.parse(location.search.substr(1))
            : null;
    if (location.pathname === locations.search) {
        if (parameters && parameters.query && parameters.query.length) {
            performSearchByQuery(dispatch, parameters.query);
        } else {
            dispatch(push(searchURLByQuery("")));
            performSearchByQuery(dispatch, "");
        }
    } else if (location.pathname === locations.searchByFilter) {
        if (
            parameters &&
            parameters.type &&
            ["ingridients", "alcoholic", "category", "glass"].includes(
                parameters.type
            )
        ) {
            //&& "category contains parameters.name"
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
