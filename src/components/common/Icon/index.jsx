import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Icon.css";

class Icon extends Component {
    static types = {
        arrowUp: "arrow_up",
        arrowDown: "arrow_down",
        arrowLeft: "arrow_left",
        arrowRight: "arrow_right",
        remove: "remove",
        search: "search",
        spinner: "spinner",
        checked: "checked",
        logo: "logo",
        category: "category",
        glass: "glass",
        iba: "iba",
        alcohol: "alcohol",
        star: "star",
        starFilled: "star_filled",
        favorites: "favorites",
        favoritesFilled: "favorites_filled",
    };

    static colors = {
        dark: "dark",
        light: "light",
    };

    static propTypes = {
        type: PropTypes.oneOf(Object.values(Icon.types)).isRequired,
        color: PropTypes.oneOf(Object.values(Icon.colors)).isRequired,
    };

    static defaultProps = {
        color: Icon.colors.dark,
    };

    render() {
        const className = classNames("icon", `icon_${this.props.type}`, {
            [`icon_${this.props.color}`]: this.props.type !== Icon.colors.dark,
        });
        return <span className={className} />;
    }
}

export default Icon;
