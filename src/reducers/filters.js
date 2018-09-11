import types, { filterTypes } from "../constants/filters";

const initialState = {
    [filterTypes.category]: [],
    [filterTypes.glass]: [],
    [filterTypes.alcoholic]: [],
    [filterTypes.ingridient]: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILTERS_RECEIVED:
            const { category, glass, alcoholic, ingridient } = action.payload;
            return {
                ...state,
                category,
                glass,
                alcoholic,
                ingridient,
            };
        default:
            return state;
    }
};
