import axios from "axios";

import types from "../constants/details";
import { pathDataFromLocation } from "../helpers/pathData";
import { searchTypes } from "../constants/search";
import { cocktailRequest, ingredientRequest } from "../api";
import { showError } from "./notifications";
import locations, { historyLocations } from "../constants/locations";

const addToHistory = (id, location, dispatch) => {
    const { shortPath, query } = pathDataFromLocation(location);
    if (!historyLocations.has(shortPath)) {
        return;
    }
    dispatch({
        type: types.DETAILS_HISTORY,
        payload: {
            [shortPath]: {
                id,
                query,
            },
        },
    });
};

const findCocktailInSearch = (id, search) => {
    if (search.request.type === searchTypes.query) {
        const cocktail = search.response.results.find(
            item => item.idDrink === id
        );
        return cocktail;
    }
    return null;
};

const findCocktailInValues = (id, list) => {
    return list.values[id] ? list.values[id] : null;
};

export const loadCocktailDetails = id => async (dispatch, getState) => {
    dispatch({
        type: types.DETAILS_CLEAR,
        payload: {
            cocktail: null,
        },
    });
    const state = getState();
    addToHistory(id, state.router.location, dispatch);

    const location = state.router.location.pathname;
    let cocktail = null;
    if (location.startsWith(locations.search)) {
        cocktail = findCocktailInSearch(id, state.search);
    } else if (location.startsWith(locations.favorites)) {
        cocktail = findCocktailInValues(id, state.favorites);
    } else if (location.startsWith(locations.random)) {
        cocktail = findCocktailInValues(id, state.random);
    }

    if (cocktail) {
        dispatch({
            type: types.DETAILS_RECEIVED,
            payload: {
                cocktail,
            },
        });
        return;
    }

    try {
        const result = await cocktailRequest(id);
        dispatch({
            type: types.DETAILS_RECEIVED,
            payload: {
                cocktail: result.data.drinks[0],
            },
        });
    } catch (error) {
        if (axios.isCancel(error)) {
            return;
        }
        dispatch(showError());
    }
};

export const loadIngredientDetails = id => async (dispatch, getState) => {
    dispatch({
        type: types.DETAILS_CLEAR,
        payload: {
            ingredient: null,
        },
    });
    const state = getState();
    addToHistory(id, state.router.location, dispatch);

    try {
        const result = await ingredientRequest(id);
        dispatch({
            type: types.DETAILS_RECEIVED,
            payload: {
                ingredient: result.data.ingredients[0],
            },
        });
    } catch (error) {
        if (axios.isCancel(error)) {
            return;
        }
        dispatch(showError());
    }
};

export const clearDetailsHistory = () => (dispatch, getState) => {
    const path = pathDataFromLocation(getState().router.location);
    if (!historyLocations.has(path.shortPath)) {
        return;
    }
    dispatch({
        type: types.DETAILS_HISTORY,
        payload: {
            [path.shortPath]: null,
        },
    });
};
