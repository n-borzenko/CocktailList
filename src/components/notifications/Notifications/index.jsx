import React, { Component } from "react";
import { connect } from "react-redux";

import { removeNotification } from "../../../actions/notifications";
import Notification from "../Notification";

import "./Notifications.css";

class Notifications extends Component {
    render() {
        return (
            <div className="notifications">
                {this.props.notifications.map(notification => (
                    <div className="notifications__item" key={notification.id}>
                        <Notification
                            onClick={() =>
                                this.props.removeNotification(notification.id)
                            }
                        >
                            {notification.message}
                        </Notification>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    state => ({ notifications: state.notifications.messages }),
    { removeNotification }
)(Notifications);
