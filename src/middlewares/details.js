import types from "../constants/details";
import { historyLocations } from "../constants/locations";
import { pathDataFromLocation } from "../helpers/pathData";

// details history helps to scroll the list of cocktails or ingredients
export const clearDetailsHistory = ({
    getState,
    dispatch,
}) => next => action => {
    if (action.type === types.DETAILS_HISTORY) {
        return next(action);
    }
    const oldState = getState();
    const oldPath = pathDataFromLocation(oldState.router.location);
    const result = next(action);
    const newState = getState();
    const newPath = pathDataFromLocation(newState.router.location);

    if (
        oldState.details.history[oldPath.shortPath] &&
        historyLocations.has(oldPath.shortPath) &&
        (oldPath.shortPath !== newPath.shortPath ||
            oldPath.query !== newPath.query ||
            !oldPath.isDetails)
    ) {
        dispatch({
            type: types.DETAILS_HISTORY,
            payload: {
                [oldPath.shortPath]: null,
            },
        });
    }
    return result;
};
