import types, { filterTypes } from "../constants/filters";

const initialState = {
    [filterTypes.category]: [],
    [filterTypes.glass]: [],
    [filterTypes.alcoholic]: [],
    [filterTypes.ingredient]: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILTERS_RECEIVED:
            const { category, glass, alcoholic, ingredient } = action.payload;
            return {
                ...state,
                category,
                glass,
                alcoholic,
                ingredient,
            };
        default:
            return state;
    }
};
