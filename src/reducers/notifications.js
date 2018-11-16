import types from "../constants/notifications";

const initialState = { messages: [] };

export default (state = initialState, action) => {
    switch (action.type) {
        case types.NOTIFICATIONS_ADD: {
            const messages = [...state.messages];
            const id = Math.max(...messages.map(message => message.id), 0) + 1;
            messages.push({
                ...action.payload,
                id,
            });
            return { messages };
        }
        case types.NOTIFICATIONS_REMOVE: {
            const id = action.payload.id;
            const messages = [...state.messages];
            return { messages: messages.filter(item => item.id !== id) };
        }
        default:
            return state;
    }
};
