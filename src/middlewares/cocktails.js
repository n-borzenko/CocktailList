import qs from "qs";

import types from "../constants/details";
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

const shortLocationChanged = (oldLocation, newLocation) => {
    const oldShort = shortLocation(oldLocation.pathname);
    const newShort = shortLocation(newLocation.pathname);

    // clear if main location is changed
    if (oldShort !== newShort) {
        return true;
    }

    // don't clear if main location is same
    if (oldShort !== locations.search) {
        return false;
    }

    // clear if search type has changed
    let oldSearch;
    if (cocktailLocation(oldLocation.pathname)) {
        const parameters =
            oldLocation && oldLocation.search && oldLocation.search.length > 1
                ? qs.parse(oldLocation.search.substr(1))
                : null;
        oldSearch =
            parameters && parameters.type && parameters.name
                ? locations.searchByFilter
                : locations.search;
    } else {
        oldSearch = oldLocation.pathname.startsWith(locations.searchByFilter)
            ? locations.searchByFilter
            : locations.search;
    }

    if (oldSearch === locations.searchByFilter) {
        return !newLocation.pathname.startsWith(locations.searchByFilter);
    } else {
        return newLocation.pathname.startsWith(locations.searchByFilter);
    }
};

// cocktail is used to scroll the list of cocktails
// when the main location is changed, cocktail should be cleared
export const clearCocktails = ({ getState, dispatch }) => next => action => {
    const oldLocation = getState().router.location;
    const result = next(action);
    const state = getState();
    const newLocation = state.router.location;

    if (
        oldLocation.pathname !== newLocation.pathname &&
        state.cocktail.value &&
        !cocktailLocation(newLocation.pathname) &&
        shortLocationChanged(oldLocation, newLocation)
    ) {
        console.log("CLEAR");
        dispatch({ type: types.COCKTAIL_CLEAR });
    }
    return result;
};
