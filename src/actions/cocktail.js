import axios from "axios";
import { push } from "connected-react-router";

import types from "../constants/cocktail";
import { searchTypes } from "../constants/search";
import { cocktailRequest } from "../api";

export const loadCocktailDetails = id => async (dispatch, getState) => {
    dispatch({
        type: types.COCKTAIL_CLEAR,
    });
    const search = getState().search;

    if (search.request.type === searchTypes.query) {
        const cocktail = search.response.results.find(
            item => item.idDrink === id
        );
        if (cocktail) {
            dispatch({
                type: types.COCKTAIL_RECEIVED,
                payload: {
                    value: cocktail,
                },
            });
            return;
        }
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
            console.log("cancelled");
            return;
        }
        console.error(error);
    }
};

export const moveToURL = URL => dispatch => {
    dispatch(push(URL));
};
