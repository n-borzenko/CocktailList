import types from "../constants/search";

const initialState = {
    text: null,
    results: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_COMPLETED:
            return {
                text: action.payload.text,
                results: action.payload.results.sort((item1, item2) =>
                    item1.strDrink.localeCompare(item2.strDrink)
                ),
            };
        default:
            return state;
    }
};
