import { setToStorage } from "../helpers/storage";
import { favoritesKeys } from "../constants/favorites";

const favoritesMiddleware = ({ getState }) => next => action => {
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
