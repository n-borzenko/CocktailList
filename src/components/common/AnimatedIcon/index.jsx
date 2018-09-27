import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "../Icon";

import "./AnimatedIcon.css";

class AnimatedIcon extends Component {
    static position = {
        up: "up",
        down: "down",
    };

    static propTypes = {
        style: PropTypes.oneOf(Object.values(Icon.colors)).isRequired,
        children: PropTypes.node.isRequired,
        position: PropTypes.oneOf(Object.values(AnimatedIcon.position))
            .isRequired,
    };

    static defaultProps = {
        style: Icon.colors.dark,
        position: AnimatedIcon.position.down,
    };

    render() {
        const className = classNames(
            "animated-icon_rotate",
            `animated-icon_rotate_${this.props.position}`
        );

        return (
            <span className={className}>
                {React.cloneElement(this.props.children, {
                    ...this.props.children.props,
                    style: this.props.style,
                })}
            </span>
        );
    }
}

export default AnimatedIcon;
