import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "../Icon";
import "./ActionButton.css";

class ActionButton extends Component {
    static types = {
        arrowUp: Icon.types.arrowUp,
        arrowDown: Icon.types.arrowDown,
        arrowLeft: Icon.types.arrowLeft,
        arrowRight: Icon.types.arrowRight,
        remove: Icon.types.remove,
        search: Icon.types.search,
    };

    static styles = {
        dark: "dark",
        light: "light",
        transparent: "transparent",
        none: "none",
    };

    static propTypes = {
        type: PropTypes.oneOf(Object.values(ActionButton.types)).isRequired,
        style: PropTypes.oneOf(Object.values(ActionButton.styles)).isRequired,
        disabled: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        style: ActionButton.styles.dark,
        disabled: false,
    };

    renderIcon() {
        return (
            <Icon
                type={this.props.type}
                color={
                    this.props.style !== ActionButton.styles.dark
                        ? Icon.colors.light
                        : Icon.colors.dark
                }
            />
        );
    }

    render() {
        const className = classNames("action-button", {
            [`action-button_${this.props.style}`]:
                this.props.style !== ActionButton.styles.dark,
        });
        return (
            <button
                className={className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
            >
                <span className="action-button__icon">{this.renderIcon()}</span>
            </button>
        );
    }
}

export default ActionButton;
