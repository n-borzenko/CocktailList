import types from "../constants/details";
import { historyLocations } from "../constants/locations";
import { areaFromLocation } from "../helpers/areas";

// details history is used to scroll the list of cocktails or ingredients
export const clearDetailsHistory = ({
    getState,
    dispatch,
}) => next => action => {
    if (action.type === types.DETAILS_HISTORY) {
        return next(action);
    }
    const oldState = getState();
    const oldArea = areaFromLocation(oldState.router.location);
    const result = next(action);
    const newState = getState();
    const newArea = areaFromLocation(newState.router.location);

    if (
        oldState.details.history[oldArea.area] &&
        historyLocations.has(oldArea.area) &&
        (oldArea.area !== newArea.area ||
            oldArea.query !== newArea.query ||
            !oldArea.isDetails)
    ) {
        dispatch({
            type: types.DETAILS_HISTORY,
            payload: {
                [oldArea.area]: null,
            },
        });
    }
    return result;
};
