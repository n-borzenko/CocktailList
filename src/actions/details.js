import axios from "axios";

import types from "../constants/details";
import { areaFromLocation } from "../helpers/areas";
import { searchTypes } from "../constants/search";
import { cocktailRequest } from "../api";
import { showError } from "./notifications";
import locations from "../constants/locations";

const historyLocations = new Set([
    locations.search,
    locations.searchByFilter,
    locations.favorites,
    locations.ingredients,
]);

const addToHistory = (id, location, dispatch) => {
    const { area, query } = areaFromLocation(location);
    if (!historyLocations.has(area)) {
        return;
    }
    dispatch({
        type: types.DETAILS_HISTORY,
        payload: {
            [area]: {
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
    if (list.values.hasOwnProperty(id) && list.values[id] !== null) {
        return list.values[id];
    }
    return null;
};

export const loadCocktailDetails = id => async (dispatch, getState) => {
    dispatch({
        type: types.DETAILS_CLEAR,
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
    });
    const state = getState();
    addToHistory(id, state.router.location, dispatch);

    // const location = state.router.location.pathname;
    // let cocktail = null;
    // if (location.startsWith(locations.search)) {
    //     cocktail = findCocktailInSearch(id, state.search);
    // } else if (location.startsWith(locations.favorites)) {
    //     cocktail = findCocktailInValues(id, state.favorites);
    // } else if (location.startsWith(locations.random)) {
    //     cocktail = findCocktailInValues(id, state.random);
    // }

    // if (cocktail) {
    //     dispatch({
    //         type: types.DETAILS_RECEIVED,
    //         payload: {
    //             cocktail,
    //         },
    //     });
    //     return;
    // }

    // try {
    //     const result = await cocktailRequest(id);
    //     dispatch({
    //         type: types.DETAILS_RECEIVED,
    //         payload: {
    //             cocktail: result.data.drinks[0],
    //         },
    //     });
    // } catch (error) {
    //     if (axios.isCancel(error)) {
    //         return;
    //     }
    //     dispatch(showError());
    // }
};
