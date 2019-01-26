import types, { filterTypes, filterStrings } from "../constants/filters";
import { filterRequest } from "../api";
import { showError } from "./notifications";

const performRequests = async (filters, dispatch) => {
    const requests = filters.map(type => filterRequest(type));

    try {
        const lists = await Promise.all(requests);
        let payload = {};

        lists.forEach((list, index) => {
            const filter = filters[index];
            const string = filterStrings[filter];
            payload[filter] = list.data.drinks
                .map(item => item[string])
                .filter(item => item !== null)
                .sort((item1, item2) => item1.localeCompare(item2));
        });

        dispatch({
            type: types.FILTERS_RECEIVED,
            payload,
        });
    } catch (error) {
        dispatch(showError());
    }
};

export const getIngredientsList = () => async (dispatch, getState) => {
    let filters = getState().filters;
    if (!filters.ingredient.length) {
        performRequests([filterTypes.ingredient], dispatch);
    }
};

export const getFiltersList = () => async (dispatch, getState) => {
    let filters = getState().filters;
    if (
        filters.category.length &&
        filters.ingredient.length &&
        filters.glass.length &&
        filters.alcoholic.length
    ) {
        return;
    }

    const typesList = [
        filterTypes.category,
        filterTypes.alcoholic,
        filterTypes.glass,
    ];
    if (!filters.ingredient.length) {
        typesList.push(filterTypes.ingredient);
    }

    await performRequests(typesList, dispatch);
};
