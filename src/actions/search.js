import { push } from "connected-react-router";
import qs from "qs";
import axios from "axios";

import types, { searchTypes } from "../constants/search";
import { searchRequest } from "../api";
import locations from "../constants/locations";

const SEARCH_DELAY = 300;

let timer = null;

const queryToURL = query => {
    const parameters =
        query && query.length
            ? qs.stringify({
                  query,
              })
            : "";
    return `${locations.search}?${parameters}`;
};

const filterToURL = filter => {
    const parameters = filter ? qs.stringify(filter) : "";
    return `${locations.searchByFilter}?${parameters}`;
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
            console.log("cancelled");
            return;
        }
        console.log(error);
    }
};

const performSearch = (dispatch, type, data, useDelay = false) => {
    clearTimeout(timer);

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

    if (useDelay) {
        timer = setTimeout(() => {
            performRequest(dispatch, type, data);
        }, SEARCH_DELAY);
    } else {
        performRequest(dispatch, type, data);
    }
};

export const stateToSearchURL = state => {
    if (state.type === searchTypes.filter) {
        return filterToURL(state.filter);
    } else {
        return queryToURL(state.query);
    }
};

export const searchByQuery = (text, useDelay = false) => dispatch => {
    clearTimeout(timer);
    const query = text ? text : "";
    dispatch(push(queryToURL(query)));
    const needDelay = useDelay && query.length > 0;
    performSearch(dispatch, searchTypes.query, query, needDelay);
};

export const searchByFilter = (filter = null) => dispatch => {
    dispatch(push(filterToURL(filter)));
    performSearch(dispatch, searchTypes.filter, filter);
};

export const searchByURL = location => dispatch => {
    const parameters =
        location && location.search && location.search.length > 1
            ? qs.parse(location.search.substr(1))
            : null;
    if (location.pathname === locations.search) {
        if (parameters && parameters.query && parameters.query.length) {
            performSearch(dispatch, searchTypes.query, parameters.query);
        } else {
            dispatch(push(queryToURL("")));
            performSearch(dispatch, searchTypes.query, "");
        }
    } else if (location.pathname === locations.searchByFilter) {
        //load filters if != null
        if (
            parameters &&
            parameters.type &&
            ["ingridients", "alcoholic", "category", "glass"].includes(
                parameters.type
            )
        ) {
            //&& "category contains parameters.name"
            performSearch(dispatch, searchTypes.filter, parameters.filter);
        } else {
            dispatch(push(filterToURL(null)));
            performSearch(dispatch, searchTypes.filter, null);
        }
    } else {
        dispatch(push(queryToURL("")));
        performSearch(dispatch, searchTypes.query, "");
    }
};
