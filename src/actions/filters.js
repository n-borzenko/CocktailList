import types, { filterTypes } from "../constants/filters";
import { filterRequest } from "../api";

export const getFiltersList = () => async dispatch => {
    const requests = [
        filterTypes.category,
        filterTypes.alcoholic,
        filterTypes.glass,
        filterTypes.ingridient,
    ].map(type => filterRequest(type));

    try {
        const [
            categoryList,
            alcoholicList,
            glassList,
            ingridientList,
        ] = await Promise.all(requests);
        dispatch({
            type: types.FILTERS_RECEIVED,
            payload: {
                category: categoryList.data.drinks.map(
                    item => item.strCategory
                ),
                glass: glassList.data.drinks.map(item => item.strGlass),
                alcoholic: alcoholicList.data.drinks.map(
                    item => (item.strAlcoholic ? item.strAlcoholic : "Not set")
                ),
                ingridient: ingridientList.data.drinks.map(
                    item => item.strIngredient1
                ),
            },
        });
    } catch (error) {
        console.log(error);
    }
};
