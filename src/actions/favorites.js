import types from "../constants/favorites";
import { cocktailRequest } from "../api";
import { showError, showMessage } from "./notifications";

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
        dispatch(showError());
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

export const actualizeFavorites = key => dispatch => {
    dispatch({
        type: types.FAVORITES_ACTUALIZE,
        payload: { key },
    });
};

export const clearFavorites = () => dispatch => {
    dispatch({
        type: types.FAVORITES_CLEAR,
    });
};

export const loadMissingValues = () => async (dispatch, getState) => {
    const { ids, values } = getState().favorites;
    const requests = ids
        .filter(id => !values[id])
        .map(id => cocktailRequest(id));
    if (!requests.length) {
        return;
    }

    try {
        const results = (await Promise.all(requests)).map(
            result => result.data.drinks[0]
        );
        // must be filtered because favorites may change during query execution
        const newIds = getState().favorites.ids;
        const newValues = results.filter(value =>
            newIds.includes(value.idDrink)
        );
        if (!newValues.length) {
            return;
        }
        dispatch({
            type: types.FAVORITES_UPDATE,
            payload: {
                values: newValues,
            },
        });
    } catch (error) {
        dispatch(showError());
    }
};

export const updateOutdatedValues = () => async (dispatch, getState) => {
    const oldIds = getState().favorites.ids;
    const requests = oldIds.map(id => cocktailRequest(id));

    if (requests.length) {
        try {
            const results = (await Promise.all(requests)).map(
                result => result.data.drinks[0]
            );
            // must be filtered because favorites may change during query execution
            // only values that have changes are updated
            const { ids, values } = getState().favorites;
            const newValues = results.filter(value => {
                const id = value.idDrink;
                const wasModified =
                    values[id] && values[id].dateModified
                        ? new Date(values[id].dateModified).getTime()
                        : 0;
                const isModified = value.dateModified
                    ? new Date(value.dateModified).getTime()
                    : Number.MAX_SAFE_INTEGER;
                return ids.includes(id) && isModified > wasModified;
            });
            if (newValues.length) {
                dispatch({
                    type: types.FAVORITES_UPDATE,
                    payload: {
                        values: newValues,
                    },
                });
                dispatch(showMessage("Favorites successfully updated"));
                return;
            }
        } catch (error) {
            dispatch(showError());
            return;
        }
    }
    dispatch(showMessage("Favorites have already been updated"));
};
