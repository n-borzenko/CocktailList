import { push } from "connected-react-router";
import qs from "qs";
import axios from "axios";

import types, { searchTypes } from "../constants/search";
import { searchRequest } from "../api";
import locations from "../constants/locations";
import { getFiltersList } from "./filters";
import { filterTypes } from "../constants/filters";
import { showError } from "./notifications";

const SEARCH_DELAY = 500;

let updateUrlTimeout = null;

const queryToURL = query => {
    const parameters =
        query && query.length
            ? `?${qs.stringify({
                  query,
              })}`
            : "";
    return { pathname: locations.search, search: parameters || "" };
};

const filterToURL = filter => {
    const parameters = filter ? `?${qs.stringify(filter)}` : "";
    return { pathname: locations.searchByFilter, search: parameters || "" };
};

const performRequest = async (dispatch, type, data) => {
    try {
        const response = await searchRequest(type, data);
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                results: response.data.drinks,
            },
        });
    } catch (error) {
        if (axios.isCancel(error)) {
            return;
        }
        dispatch(showError("Oops, something went wrong"));
    }
};

const performSearch = (dispatch, type, data) => {
    dispatch({
        type: types.SEARCH_STARTED,
        payload: {
            type,
            query: type === searchTypes.query ? data : null,
            filter: type === searchTypes.filter ? data : null,
        },
    });

    if (data === null) {
        dispatch({
            type: types.SEARCH_COMPLETED,
            payload: {
                results: [],
            },
        });
        return;
    }

    performRequest(dispatch, type, data);
};

export const stateToSearchURL = state => {
    if (state.type === searchTypes.filter) {
        return filterToURL(state.filter);
    } else {
        return queryToURL(state.query);
    }
};

export const searchByQuery = (text, immediately) => dispatch => {
    clearTimeout(updateUrlTimeout);
    const query = text || "";

    if (immediately) {
        dispatch(push(queryToURL(query)));
        return;
    }
    updateUrlTimeout = setTimeout(() => {
        dispatch(push(queryToURL(query)));
    }, SEARCH_DELAY);
};

export const searchByFilter = (filter = null) => dispatch => {
    dispatch(push(filterToURL(filter)));
};

export const searchByURL = location => async (dispatch, getState) => {
    const parameters =
        location && location.search && location.search.length > 1
            ? qs.parse(location.search.substr(1))
            : null;

    let pathname = location.pathname;
    if (location.pathname.startsWith(locations.searchCocktail)) {
        pathname =
            parameters && parameters.type && parameters.name
                ? locations.searchByFilter
                : locations.search;
    }

    if (pathname === locations.search) {
        if (parameters && parameters.query && parameters.query.length) {
            performSearch(dispatch, searchTypes.query, parameters.query);
        } else {
            performSearch(dispatch, searchTypes.query, "");
        }
    } else if (pathname === locations.searchByFilter) {
        let filters = getState().filters;
        if (
            !filters.category.length ||
            !filters.ingredient.length ||
            !filters.glass.length ||
            !filters.alcoholic.length
        ) {
            await dispatch(getFiltersList());
            filters = getState().filters;
        }
        if (
            parameters &&
            parameters.type &&
            parameters.name &&
            Object.keys(filterTypes).includes(parameters.type) &&
            filters[parameters.type].includes(parameters.name)
        ) {
            performSearch(dispatch, searchTypes.filter, parameters);
        } else {
            performSearch(dispatch, searchTypes.filter, null);
        }
    } else {
        performSearch(dispatch, searchTypes.query, "");
    }
};
