import axios from "axios";

import loader from "../helpers/loader";
import api from "./constants";

axios.defaults.baseURL = api.BASEURL;

export const searchByQueryRequest = async query => {
    const config = { params: { s: query }, ...api.configs.search };
    try {
        return await loader.request(config);
    } catch (error) {
        throw error;
    }
};

export const searchByFilterRequest = async filter => {
    const config = {
        params: { [filter.type[0]]: filter.name },
        ...api.configs.filter,
    };
    try {
        return await loader.request(config);
    } catch (error) {
        throw error;
    }
};
