export const ingredientImageMeduim = name => {
    return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
        name
    )}-Medium.png`;
};

export const ingredientImageSmall = name => {
    return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
        name
    )}-Small.png`;
};
