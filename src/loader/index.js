import store from "../store";
import { startLoading, finishLoading } from "../actions/loading";
import axios from "axios";

const request = async (...args) => {
    store.dispatch(startLoading());
    try {
        return await axios(...args);
    } catch (error) {
        throw error;
    } finally {
        store.dispatch(finishLoading());
    }
};

export default {
    request,
};
