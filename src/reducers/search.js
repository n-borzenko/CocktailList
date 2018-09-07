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
            const { type, query, filter } = action.payload;
            return {
                ...state,
                request: {
                    type,
                    query:
                        type === searchTypes.query
                            ? query
                            : state.request.query,
                    filter:
                        type === searchTypes.filter
                            ? filter
                            : state.request.filter,
                },
            };
        case types.SEARCH_COMPLETED:
            const { results } = action.payload;
            return {
                ...state,
                response: {
                    results: results
                        ? results.sort((item1, item2) =>
                              item1.strDrink.localeCompare(item2.strDrink)
                          )
                        : [],
                },
            };
        default:
            return state;
    }
};
