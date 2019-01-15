import axios from "axios";

import types from "../constants/cocktail";
import { searchTypes } from "../constants/search";
import { cocktailRequest } from "../api";
import { showError } from "./notifications";
import locations from "../constants/locations";

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
        type: types.COCKTAIL_CLEAR,
    });
    const state = getState();
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
            type: types.COCKTAIL_RECEIVED,
            payload: {
                value: cocktail,
            },
        });
        return;
    }

    try {
        const result = await cocktailRequest(id);
        dispatch({
            type: types.COCKTAIL_RECEIVED,
            payload: {
                value: result.data.drinks[0],
            },
        });
    } catch (error) {
        if (axios.isCancel(error)) {
            return;
        }
        dispatch(showError());
    }
};
