import types from "../constants/loading";

export const startLoading = () => ({
    type: types.START_LOADING,
});

export const finishLoading = () => ({
    type: types.FINISH_LOADING,
});
