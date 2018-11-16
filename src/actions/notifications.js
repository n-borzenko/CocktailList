import types, { notificationsLevels } from "../constants/notifications";

export const showMessage = message => dispatch => {
    dispatch({
        type: types.NOTIFICATIONS_ADD,
        payload: {
            level: notificationsLevels.info,
            message,
        },
    });
};

export const showError = (
    message = "Oops, something went wrong"
) => dispatch => {
    dispatch({
        type: types.NOTIFICATIONS_ADD,
        payload: {
            level: notificationsLevels.error,
            message,
        },
    });
};

export const removeNotification = id => dispatch => {
    dispatch({
        type: types.NOTIFICATIONS_REMOVE,
        payload: { id },
    });
};
