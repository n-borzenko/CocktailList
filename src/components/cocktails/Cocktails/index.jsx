import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Cocktail from "../Cocktail";

import "./Cocktails.css";

class Cocktails extends Component {
    static sizes = {
        small: "small",
        large: "large",
    };

    static propTypes = {
        size: PropTypes.oneOf(Object.values(Cocktails.sizes)).isRequired,
        values: PropTypes.array.isRequired,
        linkCreator: PropTypes.func.isRequired,
    };

    static defaultProps = {
        size: Cocktails.sizes.large,
    };

    renderCocktails() {
        if (!this.props.values || this.props.values.length === 0) {
            return null;
        }
        return this.props.values.map(cocktail => (
            <Cocktail
                value={cocktail}
                key={`${this.props.size}${cocktail.idDrink}`}
                to={this.props.linkCreator(cocktail.idDrink)}
            />
        ));
    }

    render() {
        const className = classNames(
            "cocktails",
            `cocktails_${this.props.size}`
        );
        return <div className={className}>{this.renderCocktails()}</div>;
    }
}

export default Cocktails;
