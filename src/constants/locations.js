const locations = {
    search: "/search",
    searchByFilter: "/search/filter",
    searchCocktail: "/search/cocktail",
    favorites: "/favorites",
    favoritesCocktail: "/favorites/cocktail",
    random: "/random",
    randomCocktail: "/random/cocktail",
    ingredients: "/ingredients",
    ingredientsDetails: "/ingredients/details",
    about: "/about",
};

export default locations;

export const historyLocations = new Set([
    locations.search,
    locations.searchByFilter,
    locations.favorites,
    locations.ingredients,
]);
