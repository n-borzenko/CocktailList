import qs from "qs";

import { searchTypes } from "../constants/search";
import locations from "../constants/locations";

export const searchURLByQuery = query => {
    const parameters =
        query && query.length
            ? qs.stringify({
                  query,
              })
            : "";
    return `${locations.search}?${parameters}`;
};

export const searchURLByFilter = filter => {
    const parameters = filter ? qs.stringify(filter) : "";
    return `${locations.searchByFilter}?${parameters}`;
};

export const searchURLFromState = state => {
    if (state.type === searchTypes.filter) {
        return searchURLByFilter(state.filter);
    } else {
        return searchURLByQuery(state.query);
    }
};
