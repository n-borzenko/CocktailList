import types from "../constants/search";

const initialState = {
    text: null,
    results: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_COMPLETED:
            const { type, text, results, filters } = action.payload;
            return {
                type,
                text,
                filters,
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
