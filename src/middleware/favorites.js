import { setToStorage, getFromStorage } from "../helpers/storage";
import types, { favoritesKeys } from "../constants/favorites";

const favoritesMiddleware = ({ getState }) => next => action => {
    if (action.type === types.FAVORITES_ACTUALIZE) {
        if (action.payload.key === favoritesKeys.ids) {
            const ids = getFromStorage(favoritesKeys.ids, []);
            return next({ type: types.FAVORITES_ACTUALIZE, payload: { ids } });
        } else if (action.payload.key === favoritesKeys.values) {
            const values = getFromStorage(favoritesKeys.values, {});
            return next({
                type: types.FAVORITES_ACTUALIZE,
                payload: { values },
            });
        }
        return;
    }

    const oldState = getState();
    const result = next(action);
    const state = getState();
    if (oldState.favorites && oldState.favorites.ids !== state.favorites.ids) {
        setToStorage(favoritesKeys.ids, state.favorites.ids);
    }
    if (
        oldState.favorites &&
        oldState.favorites.values !== state.favorites.values
    ) {
        setToStorage(favoritesKeys.values, state.favorites.values);
    }
    return result;
};

export default favoritesMiddleware;
