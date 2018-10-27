export const ingridientImage = name => {
    return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
        name
    )}-Small.png`;
};
