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
        additionalSource: PropTypes.string,
        size: PropTypes.oneOf(Object.values(Picture.sizes)).isRequired,
    };

    static defaultProps = {
        size: Picture.sizes.default,
    };

    constructor(props) {
        super(props);
        this.state = { source: null };

        let counter = 0;
        const image = new Image();
        image.onload = () => {
            if (this.unmounted) {
                return;
            }
            this.setState({
                source: counter
                    ? this.props.additionalSource
                    : this.props.source,
            });
        };
        image.onerror = () => {
            if (this.unmounted) {
                return;
            }
            counter += 1;
            if (counter < 1 && props.additionalSource) {
                image.src = props.additionalSource;
            }
        };
        image.src = props.source;
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    renderSpinner = () => {
        if (this.state.source) {
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
        const style = this.state.source
            ? { backgroundImage: `url("${this.state.source}")` }
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
