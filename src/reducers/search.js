import types from "../constants/search";

const items = [
    { id: 0, name: "qew" },
    { id: 1, name: "ololo" },
    { id: 2, name: "qwertyqwerty" },
    { id: 3, name: "1234qwe" },
    { id: 4, name: "oleroteor6o" },
    { id: 5, name: "oleroteo5ro" },
    { id: 6, name: "olerote4o" },
    { id: 7, name: "olerot3eoro" },
    { id: 8, name: "olero2teoro" },
];

const initialState = {
    text: null,
    results: items,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_SEARCH:
            return {
                text: action.payload.text,
                results: items.filter(item =>
                    item.name.startsWith(action.payload.text)
                ),
            };
        default:
            return state;
    }
};
