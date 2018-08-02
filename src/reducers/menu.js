import types, { MenuItems } from "../constants/menu";

const initialState = {
    items: [
        MenuItems.SEARCH,
        MenuItems.FAVORITES,
        MenuItems.RANDOM,
        MenuItems.INGRIDIENTS,
    ],
    selected: 0,
};

export var menu = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECT_MENU_ITEM:
            return {
                items: state.items,
                selected: action.payload.index,
            };
        default:
            return state;
    }
};
