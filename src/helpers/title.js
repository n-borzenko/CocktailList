import { searchTypes } from "../constants/search";

const DELIMITER = "∙";

export const createCocktailTitle = name => {
    let parameters = name ? `${name} ${DELIMITER} ` : "";
    setTitle(`${parameters}Cocktail details`);
};

export const createSearchTitle = request => {
    let parameters = "";
    if (request.type === searchTypes.filter && request.filter) {
        parameters = `${request.filter.name} ${DELIMITER} `;
    } else if (request.type === searchTypes.query && request.query) {
        parameters = `${request.query} ${DELIMITER} `;
    }
    setTitle(`${parameters}Search`);
};

export const createFavoritesTitle = () => {
    setTitle(`Favorites`);
};

export const createRandomTitle = (name = null) => {
    let parameters = name ? `${name} ${DELIMITER} ` : "";
    setTitle(`${parameters}Random`);
};

export const createIngredientsTitle = () => {
    setTitle(`Ingredients`);
};

export const createIngredientTitle = name => {
    let parameters = name ? `${name} ${DELIMITER} ` : "";
    setTitle(`${parameters}Ingredient details`);
};

export const createAboutTitle = () => {
    setTitle(`About`);
};

const setTitle = title => {
    document.title = `${title} ${DELIMITER} CocktailList`;
};

export default setTitle;
