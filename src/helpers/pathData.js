import qs from "qs";

import locations from "../constants/locations";

export const detailsLocation = pathname => {
    return (
        pathname.startsWith(locations.searchCocktail) ||
        pathname.startsWith(locations.favoritesCocktail) ||
        pathname.startsWith(locations.randomCocktail) ||
        pathname.startsWith(locations.ingredientsDetails)
    );
};

export const pathDataFromLocation = location => {
    const detailsPathname = detailsLocation(location.pathname);
    let pathname = null;
    let query = null;

    // "/favorites", "/random", "/ingredients" paths
    if (location.pathname.startsWith(locations.favorites)) {
        pathname = locations.favorites;
    } else if (location.pathname.startsWith(locations.random)) {
        pathname = locations.random;
    } else if (location.pathname.startsWith(locations.ingredients)) {
        pathname = locations.ingredients;
    }

    if (pathname) {
        return { shortPath: pathname, isDetails: detailsPathname, query };
    }

    // "/search" paths

    const parameters =
        location && location.search && location.search.length > 1
            ? qs.parse(location.search.substr(1))
            : null;

    pathname = location.pathname;
    if (detailsPathname) {
        pathname =
            parameters && parameters.type && parameters.name
                ? locations.searchByFilter
                : locations.search;
    }

    if (pathname === locations.search) {
        if (parameters && parameters.query && parameters.query.length) {
            query = qs.stringify({
                query: parameters.query,
            });
        }
    } else if (pathname === locations.searchByFilter) {
        if (
            parameters &&
            parameters.type &&
            parameters.type.length &&
            parameters.name &&
            parameters.name.length
        ) {
            const { type, name } = parameters;
            query = qs.stringify({
                type,
                name,
            });
        }
    }

    return { shortPath: pathname, isDetails: detailsPathname, query };
};
