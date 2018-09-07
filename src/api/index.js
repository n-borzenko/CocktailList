import axios from "axios";

import loader from "../helpers/loader";
import api from "./constants";
import axios from "axios";

axios.defaults.baseURL = api.BASEURL;

let cancellationSearchToken = null;
export const searchByQueryRequest = async query => {
    if (cancellationSearchToken) {
        cancellationSearchToken.cancel();
    }
    cancellationSearchToken = axios.CancelToken.source();
    const config = {
        ...api.configs.search,
        params: { s: query },
        cancelToken: cancellationSearchToken.token,
    };
    try {
        const result = await loader.request(config);
        cancellationSearchToken = null;
        return result;
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
