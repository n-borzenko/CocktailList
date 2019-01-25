import { combineReducers } from "redux";

import types from "../constants/details";
import locations from "../constants/locations";

const currentInitialState = {
    cocktail: null,
    ingredient: null,
};

const current = (state = currentInitialState, action) => {
    switch (action.type) {
        case types.DETAILS_RECEIVED:
            return {
                ...state,
                ...action.payload,
            };
        case types.DETAILS_CLEAR:
            return currentInitialState;
        default:
            return state;
    }
};

const historyInitialState = {
    [locations.search]: null,
    [locations.searchByFilter]: null,
    [locations.favorites]: null,
    [locations.ingredients]: null,
};

const history = (state = historyInitialState, action) => {
    switch (action.type) {
        case types.DETAILS_HISTORY:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default combineReducers({ current, history });
