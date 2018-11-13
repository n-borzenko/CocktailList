import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import favoritesMiddleware from "../middleware/favorites";
import cocktailsMiddleware from "../middleware/cocktails";
import search from "../reducers/search";
import loading from "../reducers/loading";
import filters from "../reducers/filters";
import cocktail from "../reducers/cocktail";
import favorites from "../reducers/favorites";
import notifications from "../reducers/notifications";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    search,
    loading,
    filters,
    cocktail,
    favorites,
    notifications,
});

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
        routerMiddleware(history),
        thunk,
        favoritesMiddleware,
        cocktailsMiddleware
    )
);

export default store;
