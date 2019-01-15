import types from "../constants/random";

const initialState = {
    id: null,
    values: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RANDOM_RECEIVED:
            return {
                ...action.payload,
            };
        case types.RANDOM_CLEAR:
            return {
                id: null,
                values: {},
            };
        default:
            return state;
    }
};
