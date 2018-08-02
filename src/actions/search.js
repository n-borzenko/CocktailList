import types from "../constants/search";

export const startSearch = text => ({
    type: types.START_SEARCH,
    payload: {
        text,
    },
});
