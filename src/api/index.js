import axios from "axios";

import loader from "../loader";
import api from "./constants";

axios.defaults.baseURL = api.BASEURL;

export const searchRequest = async text => {
    const config = { params: { s: text }, ...api.configs.search };
    try {
        return await loader.request(config);
    } catch (error) {
        throw error;
    }
};
