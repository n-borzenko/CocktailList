import types from "../constants/loading";

const initialState = {
    active: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_LOADING:
            return {
                active: true,
            };
        case types.FINISH_LOADING:
            return {
                active: false,
            };
        default:
            return state;
    }
};
