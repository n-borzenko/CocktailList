import types from "../constants/cocktail";
import locations from "../constants/locations";

const cocktailLocation = pathname => {
    return (
        pathname.startsWith(locations.searchCocktail) ||
        pathname.startsWith(locations.favoritesCocktail) ||
        pathname.startsWith(locations.randomCocktail)
    );
};

const shortLocation = pathname => {
    if (pathname.startsWith(locations.search) || pathname === "") {
        return locations.search;
    } else if (pathname.startsWith(locations.favorites)) {
        return locations.favorites;
    } else if (pathname.startsWith(locations.random)) {
        return locations.random;
    } else if (pathname.startsWith(locations.ingredients)) {
        return locations.ingredients;
    }
};

// cocktail is used to scroll the list of cocktails
// when the main location is changed, cocktail should be cleared
export const clearCocktails = ({ getState, dispatch }) => next => action => {
    const oldLocation = getState().router.location.pathname;
    const result = next(action);
    const state = getState();
    const newLocation = state.router.location.pathname;

    if (
        oldLocation !== newLocation &&
        state.cocktail.value &&
        !cocktailLocation(newLocation) &&
        shortLocation(oldLocation) !== shortLocation(newLocation)
    ) {
        dispatch({ type: types.COCKTAIL_CLEAR });
    }
    return result;
};
