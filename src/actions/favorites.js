import types from "../constants/favorites";
import { cocktailRequest } from "../api";

export const addToFavorites = (id, value = null) => async dispatch => {
    dispatch({
        type: types.FAVORITES_ADD,
        payload: {
            id,
            value: value || null,
        },
    });
    if (value) {
        return;
    }

    try {
        const result = await cocktailRequest(id);
        dispatch({
            type: types.FAVORITES_APPEND,
            payload: {
                id,
                value: result.data.drinks[0],
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const removeFromFavorites = id => dispatch => {
    dispatch({
        type: types.FAVORITES_REMOVE,
        payload: {
            id,
        },
    });
};
