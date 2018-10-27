export const ingredientImage = name => {
    return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
        name
    )}-Small.png`;
};
