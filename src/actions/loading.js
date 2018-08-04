import types from "../constants/loading";

export const startLoading = () => ({
    type: types.START_LOADING,
});

export const finishLoading = error => ({
    type: types.FINISH_LOADING,
    payload: {
        error,
    },
});
