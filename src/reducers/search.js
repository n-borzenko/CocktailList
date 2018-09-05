import types, { searchTypes } from "../constants/search";

const initialState = {
    type: searchTypes.query,
    query: null,
    filter: null,
    results: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_COMPLETED:
            const { type, query, results, filter } = action.payload;
            return {
                type,
                query: type === searchTypes.query ? query : state.query,
                filter: type === searchTypes.filter ? filter : state.filter,
                results: results
                    ? results.sort((item1, item2) =>
                          item1.strDrink.localeCompare(item2.strDrink)
                      )
                    : [],
            };
        default:
            return state;
    }
};
