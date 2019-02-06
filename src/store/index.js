import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import logger from "redux-logger";

import { actualizeFavorites, storeFavorites } from "../middlewares/favorites";
import { clearDetailsHistory } from "../middlewares/details";
import search from "../reducers/search";
import loading from "../reducers/loading";
import filters from "../reducers/filters";
import details from "../reducers/details";
import favorites from "../reducers/favorites";
import random from "../reducers/random";
import notifications from "../reducers/notifications";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    search,
    loading,
    filters,
    details,
    favorites,
    random,
    notifications,
});

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
        routerMiddleware(history),
        thunk,
        storeFavorites,
        actualizeFavorites,
        clearDetailsHistory,
        logger
    )
);

export default store;
