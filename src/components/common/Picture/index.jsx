import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import AnimatedIcon from "../AnimatedIcon";
import Icon from "../Icon";

import "./Picture.css";

class Picture extends Component {
    static sizes = {
        medium: "medium",
        default: "default",
    };

    static propTypes = {
        source: PropTypes.string.isRequired,
        size: PropTypes.oneOf(Object.values(Picture.sizes)).isRequired,
    };

    static defaultProps = {
        size: Picture.sizes.default,
    };

    constructor(props) {
        super(props);
        this.state = { loaded: false };

        const image = new Image();
        image.onload = () => {
            if (this.unmounted) {
                return;
            }
            this.setState({ loaded: true });
        };
        image.src = props.source;
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    renderSpinner = () => {
        if (this.state.loaded) {
            return null;
        }
        return (
            <span className="picture__spinner">
                <AnimatedIcon animation={AnimatedIcon.animation.forever}>
                    <Icon type={Icon.types.spinner} color={Icon.colors.light} />
                </AnimatedIcon>
            </span>
        );
    };

    render() {
        const style = this.state.loaded
            ? { backgroundImage: `url("${this.props.source}")` }
            : null;
        const className = classNames("picture", {
            [`picture_${this.props.size}`]:
                this.props.size !== Picture.sizes.default,
        });
        return (
            <span className={className} style={style}>
                {this.renderSpinner()}
            </span>
        );
    }
}

export default Picture;
