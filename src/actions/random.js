import { replace } from "connected-react-router";
import qs from "qs";

import types from "../constants/random";
import { randomRequest, cocktailRequest } from "../api";
import { showError } from "./notifications";
import locations from "../constants/locations";

const FAVORITES_LIMIT = 1;

export const loadRandomCocktail = () => async (dispatch, getState) => {
    dispatch({
        type: types.RANDOM_CLEAR,
    });

    try {
        let payload = null;
        let counter = 0;
        while (!payload) {
            const result = await randomRequest();
            const favorites = getState().favorites.ids;
            const cocktail = result.data.drinks[0];
            if (
                counter++ > FAVORITES_LIMIT ||
                !favorites.includes(cocktail.id)
            ) {
                payload = {
                    id: cocktail.idDrink,
                    values: {
                        [cocktail.idDrink]: cocktail,
                    },
                };
            }
        }
        dispatch({ type: types.RANDOM_RECEIVED, payload });

        console.log(getState().router.location.pathname);
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
        console.log(getState().random.values[id]);
        console.log("exist");
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
