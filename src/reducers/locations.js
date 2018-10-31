import { locations } from "../constants/locations";
import types from "../constants/locations";

const initialState = {
    lastMenuPathname: null,
};

const menuPathnames = new Set([
    locations.search,
    locations.favorites,
    locations.random,
    locations.ingredients,
]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOCATION_CHANGE:
            const pathname = action.payload.location.pathname;
            const index = pathname.indexOf("/", 1);
            const newPathname =
                index !== -1 ? pathname.substring(0, index) : pathname;
            return state.lastMenuPathname !== newPathname &&
                menuPathnames.has(newPathname)
                ? { lastMenuPathname: newPathname }
                : state;
        default:
            return state;
    }
};
