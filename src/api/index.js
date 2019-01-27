import axios from "axios";

import loader from "../helpers/loader";
import api from "./constants";
import { searchTypes } from "../constants/search";

axios.defaults.baseURL = api.BASEURL;

let cancellationSearchToken = null;
let cancellationCocktailToken = null;

const createConfig = (type, data, cancelToken) => {
    if (type === searchTypes.filter) {
        return {
            ...api.configs.filter,
            params: {
                [data.type[0]]: data.name,
            },
            cancelToken,
        };
    } else {
        return { ...api.configs.search, params: { s: data }, cancelToken };
    }
};

export const searchRequest = async (type, data) => {
    if (cancellationSearchToken) {
        cancellationSearchToken.cancel();
    }
    cancellationSearchToken = axios.CancelToken.source();
    const config = createConfig(type, data, cancellationSearchToken.token);
    try {
        const result = await loader.request(config);
        return result;
    } catch (error) {
        throw error;
    } finally {
        cancellationSearchToken = null;
    }
};

export const filterRequest = async type => {
    const config = { ...api.configs.list, params: { [type[0]]: "list" } };
    try {
        const result = await loader.request(config);
        return result;
    } catch (error) {
        throw error;
    }
};

export const cocktailRequest = async id => {
    if (cancellationCocktailToken) {
        cancellationCocktailToken.cancel();
    }
    cancellationCocktailToken = axios.CancelToken.source();
    const config = { ...api.configs.cocktail, params: { i: id } };
    try {
        const result = await loader.request(config);
        return result;
    } catch (error) {
        throw error;
    } finally {
        cancellationCocktailToken = null;
    }
};

export const ingredientRequest = async id => {
    const config = { ...api.configs.ingredient, params: { i: id } };
    try {
        const result = await loader.request(config);
        return result;
    } catch (error) {
        throw error;
    }
};

export const randomRequest = async () => {
    const config = { ...api.configs.random };
    try {
        const result = await loader.request(config);
        return result;
    } catch (error) {
        throw error;
    }
};
