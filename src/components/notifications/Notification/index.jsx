import React, { Component } from "react";
import PropTypes from "prop-types";

import Icon from "../../common/Icon";

import "./Notification.css";

const NOTIFICATION_TIME = 5000;

class Notification extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    timer = null;

    componentDidMount() {
        this.timer = setTimeout(this.props.onClick, NOTIFICATION_TIME);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <button className="notification" onClick={this.props.onClick}>
                <span className="notification__message">
                    {this.props.children}
                </span>
                <span className="notification__icon">
                    <Icon type={Icon.types.remove} color={Icon.colors.dark} />
                </span>
            </button>
        );
    }
}

export default Notification;
