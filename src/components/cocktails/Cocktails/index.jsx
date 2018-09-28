import React, { Component } from "react";
import PropTypes from "prop-types";

import Cocktail from "../Cocktail";

import "./Cocktails.css";

class Cocktails extends Component {
    static propTypes = {
        values: PropTypes.array.isRequired,
    };

    renderCocktails() {
        if (!this.props.values || this.props.values.length === 0) {
            return null;
        }
        return this.props.values.map(cocktail => (
            <Cocktail value={cocktail} key={cocktail.idDrink} />
        ));
    }

    render() {
        return <div className="cocktails">{this.renderCocktails()}</div>;
    }
}

export default Cocktails;
