import axios from "axios";

import types from "../constants/cocktail";
import { searchTypes } from "../constants/search";
import { cocktailRequest } from "../api";

export const showCocktailDetails = id => async (dispatch, getState) => {
    const search = getState().search;

    // dispatch(push(queryToURL(query)));

    if (search.request.type === searchTypes.query) {
        const cocktail = search.response.results.find(
            item => item.idDrink === id
        );
        if (cocktail) {
            dispatch({
                type: types.COCKTAIL_RECEIVED,
                payload: {
                    id: cocktail,
                },
            });
            console.log("exited");
            return;
        }
    }
    console.log("searched");
    try {
        const result = await cocktailRequest(id);
        dispatch({
            type: types.COCKTAIL_RECEIVED,
            payload: {
                id: result.data.drinks[0],
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
