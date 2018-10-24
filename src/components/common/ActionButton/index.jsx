import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";

import "./ActionButton.css";

class ActionButton extends Component {
    static styles = {
        dark: "dark",
        light: "light",
        none: "none",
        transparent: "transparent",
    };

    static sizes = {
        full: "full",
        medium: "medium",
        default: "default",
    };

    static propTypes = {
        style: PropTypes.oneOf(Object.values(ActionButton.styles)).isRequired,
        size: PropTypes.oneOf(Object.values(ActionButton.sizes)).isRequired,
        disabled: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        style: ActionButton.styles.dark,
        size: ActionButton.sizes.medium,
        disabled: false,
    };

    renderIcon() {
        return React.cloneElement(this.props.children, {
            ...this.props.children.props,
            color:
                this.props.style !== ActionButton.styles.dark
                    ? Icon.colors.light
                    : Icon.colors.dark,
        });
    }

    render() {
        const { style, size, children, ...other } = this.props;
        const className = classNames("action-button", `action-button_${size}`, {
            [`action-button_${style}`]: style !== ActionButton.styles.dark,
        });
        return (
            <button className={className} {...other}>
                <span className="action-button__icon">{this.renderIcon()}</span>
            </button>
        );
    }
}

export default ActionButton;
