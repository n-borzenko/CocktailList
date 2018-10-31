import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import search from "../reducers/search";
import loading from "../reducers/loading";
import filters from "../reducers/filters";
import cocktail from "../reducers/cocktail";
import locations from "../reducers/locations";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    search,
    loading,
    filters,
    cocktail,
    locations,
});

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(routerMiddleware(history), thunk)
);

export default store;
