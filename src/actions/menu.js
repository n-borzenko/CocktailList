import types from "../constants/menu";

export const selectMenuItem = index => ({
    type: types.SELECT_MENU_ITEM,
    payload: {
        index,
    },
});
