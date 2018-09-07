import axios from "axios";

import loader from "../helpers/loader";
import api from "./constants";
import { searchTypes } from "../constants/search";

axios.defaults.baseURL = api.BASEURL;

let cancellationSearchToken = null;

const createConfig = (type, data, cancelToken) => {
    if (type === searchTypes.filter) {
        return {
            params: { [data.type[0]]: data.name },
            ...api.configs.filter,
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
