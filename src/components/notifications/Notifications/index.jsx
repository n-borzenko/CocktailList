import React from "react";
import { connect } from "react-redux";

import { removeNotification } from "../../../actions/notifications";
import Notification from "../Notification";

import "./Notifications.css";

function Notifications({ notifications, removeNotification }) {
    return (
        <div className="notifications">
            {notifications.map(notification => (
                <div className="notifications__item" key={notification.id}>
                    <Notification
                        remove={() => removeNotification(notification.id)}
                    >
                        {notification.message}
                    </Notification>
                </div>
            ))}
        </div>
    );
}

export default connect(
    state => ({ notifications: state.notifications.messages }),
    { removeNotification }
)(Notifications);
