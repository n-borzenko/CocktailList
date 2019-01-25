import types from "../constants/details";
import locations from "../constants/locations";
import { areaFromLocation } from "../helpers/areas";

// details history is used to scroll the list of cocktails
// when the search request is changed, cocktail should be cleared
export const clearSearchDetailsHistory = ({
    getState,
    dispatch,
}) => next => action => {
    const result = next(action);
    const state = getState();
    const newArea = areaFromLocation(state.router.location);

    if (
        newArea.area === locations.search ||
        newArea.area === locations.searchByFilter
    ) {
        const lastItem = state.details.history[newArea.area];
        if (lastItem && lastItem.query !== newArea.query) {
            dispatch({
                type: types.DETAILS_HISTORY,
                payload: {
                    [newArea.area]: null,
                },
            });
        }
    }
    return result;
};
