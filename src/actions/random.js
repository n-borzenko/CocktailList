import { replace } from "connected-react-router";
import qs from "qs";

import types from "../constants/random";
import { randomCocktailRequest, cocktailRequest } from "../api";
import { showError } from "./notifications";
import locations from "../constants/locations";

export const loadRandomCocktail = () => async (dispatch, getState) => {
    dispatch({
        type: types.RANDOM_CLEAR,
    });

    try {
        const result = await randomCocktailRequest();
        const cocktail = result.data.drinks[0];
        const payload = {
            id: cocktail.idDrink,
            values: {
                [cocktail.idDrink]: cocktail,
            },
        };
        dispatch({ type: types.RANDOM_RECEIVED, payload });

        if (getState().router.location.pathname === locations.random) {
            dispatch(
                replace(
                    `${locations.random}?${qs.stringify({
                        id: payload.id,
                    })}`
                )
            );
        }
    } catch (error) {
        console.log(error);
        dispatch(showError());
    }
};

export const loadRandomCocktailDetails = id => async (dispatch, getState) => {
    if (getState().random.values[id]) {
        return;
    }
    try {
        const result = await cocktailRequest(id);
        const cocktail = result.data.drinks[0];
        dispatch({
            type: types.RANDOM_RECEIVED,
            payload: {
                id: cocktail.idDrink,
                values: {
                    [cocktail.idDrink]: cocktail,
                },
            },
        });
    } catch (error) {
        dispatch(showError());
    }
};

export const stateToRandomURL = ({ id }) => {
    const parameters = id ? `?${qs.stringify({ id })}` : "";
    return { pathname: locations.random, search: parameters || "" };
};

export const detailsToRandomURL = location => {
    let id = null;
    if (location.pathname && location.pathname.length) {
        id = location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
        );
    }
    const parameters = id ? `?${qs.stringify({ id })}` : "";
    return { pathname: locations.random, search: parameters || "" };
};
