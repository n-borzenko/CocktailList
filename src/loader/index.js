import axios from "axios";

import store from "../store";
import { startLoading, finishLoading } from "../actions/loading";

const get = query => {
    store.dispatch(startLoading());
    return new Promise((resolve, reject) => {
        axios.get(query).then(
            data => {
                store.dispatch(finishLoading());
                resolve(data);
            },
            error => {
                store.dispatch(finishLoading(error));
                reject(error);
            }
        );
    });
};

export default {
    get,
};
