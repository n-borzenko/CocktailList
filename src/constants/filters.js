const FILTERS_RECEIVED = "FILTERS_RECEIVED";

export default {
    FILTERS_RECEIVED,
};

export const filterTypes = {
    category: "category",
    alcoholic: "alcoholic",
    glass: "glass",
    ingredient: "ingredient",
};

export const filterStrings = {
    [filterTypes.category]: "strCategory",
    [filterTypes.alcoholic]: "strAlcoholic",
    [filterTypes.glass]: "strGlass",
    [filterTypes.ingredient]: "strIngredient1",
};

export const filterTitles = {
    [filterTypes.category]: "Categories",
    [filterTypes.alcoholic]: "Alcoholic",
    [filterTypes.glass]: "Glasses",
    [filterTypes.ingredient]: "Ingredients",
};
