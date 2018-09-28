import React, { Component } from "react";
import PropTypes from "prop-types";

import Icon from "../Icon";

import "./AnimatedIcon.css";

class AnimatedIcon extends Component {
    static animation = {
        up: "up",
        down: "down",
        forever: "forever",
    };

    static propTypes = {
        style: PropTypes.oneOf(Object.values(Icon.colors)).isRequired,
        children: PropTypes.node.isRequired,
        animation: PropTypes.oneOf(Object.values(AnimatedIcon.animation))
            .isRequired,
    };

    static defaultProps = {
        style: Icon.colors.dark,
        animation: AnimatedIcon.animation.down,
    };

    render() {
        const className = `animated-icon animated-icon_rotate-${
            this.props.animation
        }`;
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
