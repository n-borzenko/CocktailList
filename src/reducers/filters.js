import types, { filterTypes } from "../constants/filters";

const initialState = {
    [filterTypes.category]: [],
    [filterTypes.glass]: [],
    [filterTypes.alcoholic]: [],
    [filterTypes.ingredient]: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILTERS_RECEIVED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
