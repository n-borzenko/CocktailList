import types, { favoritesKeys } from "../constants/favorites";
import { getFromStorage } from "../helpers/storage";

const sortItems = (ids, values) => {
    return ids.sort((item1, item2) => {
        if (values[item1] && values[item2]) {
            return values[item1].strDrink.localeCompare(values[item2].strDrink);
        } else if (values[item1] && !values[item2]) {
            return 1;
        } else if (!values[item1] && values[item2]) {
            return -1;
        }
        return item1 > item2 ? 1 : -1;
    });
};

const getInitialState = () => {
    const ids = getFromStorage(favoritesKeys.ids, []);
    const values = getFromStorage(favoritesKeys.values, {});
    return {
        ids: sortItems(ids, values),
        values,
    };
};

const initialState = getInitialState();

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FAVORITES_ADD: {
            const { id, value } = action.payload;
            let values = state.values;
            if (value) {
                values = { ...state.values, [id]: value };
            }
            const ids = [...state.ids, id];
            return {
                ids: sortItems(ids, values),
                values,
            };
        }
        case types.FAVORITES_APPEND: {
            const { id, value } = action.payload;
            const values = { ...state.values, [id]: value };
            return {
                ids: sortItems([...state.ids], values),
                values,
            };
        }
        case types.FAVORITES_REMOVE: {
            const { id } = action.payload;
            const values = { ...state.values };
            delete values[id];
            const ids = state.ids.filter(current => current !== id);
            return {
                ids,
                values,
            };
        }
        case types.FAVORITES_ACTUALIZE: {
            const { ids, values } = action.payload;
            const newValues = values ? values : state.values;
            const newIds = ids ? ids : state.ids;
            return { ids: sortItems(newIds, newValues), values: newValues };
        }
        default:
            return state;
    }
};
