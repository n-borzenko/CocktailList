import types from "../constants/cocktail";

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.COCKTAIL_RECEIVED:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
