import types, { searchTypes } from "../constants/search";

const initialState = {
    request: {
        type: searchTypes.query,
        query: null,
        filter: null,
    },
    response: {
        results: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_STARTED:
            const { type } = action.payload;
            return {
                ...state,
                request: {
                    ...state.request,
                    type,
                    [type]: action.payload[type],
                },
                response: {
                    results: [],
                },
            };
        case types.SEARCH_COMPLETED:
            const { results } = action.payload;
            const sortedResults =
                results && results.length
                    ? results.sort((item1, item2) =>
                          item1.strDrink.localeCompare(item2.strDrink)
                      )
                    : [];
            return {
                ...state,
                response: {
                    results: sortedResults,
                },
            };
        default:
            return state;
    }
};
