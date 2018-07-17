import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Button.css";

class Button extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        stretched: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        stretched: false,
        disabled: false,
    };

    render() {
        let className = classNames("button", {
            button_stretched: this.props.stretched,
        });
        return (
            <button
                className={className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;
