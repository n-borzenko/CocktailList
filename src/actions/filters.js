import types, { filterTypes } from "../constants/filters";
import { filterRequest } from "../api";
import { showError } from "./notifications";

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

    const requests = [
        filterTypes.category,
        filterTypes.alcoholic,
        filterTypes.glass,
        filterTypes.ingredient,
    ].map(type => filterRequest(type));

    try {
        const [
            categoryList,
            alcoholicList,
            glassList,
            ingredientList,
        ] = await Promise.all(requests);
        dispatch({
            type: types.FILTERS_RECEIVED,
            payload: {
                category: categoryList.data.drinks.map(
                    item => item.strCategory
                ),
                glass: glassList.data.drinks.map(item => item.strGlass),
                alcoholic: alcoholicList.data.drinks
                    .map(item => item.strAlcoholic)
                    .filter(item => item !== null),
                ingredient: ingredientList.data.drinks.map(
                    item => item.strIngredient1
                ),
            },
        });
    } catch (error) {
        dispatch(showError("Oops, something went wrong"));
    }
};
