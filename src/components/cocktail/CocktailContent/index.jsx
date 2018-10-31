import React, { Component } from "react";

import CocktailDetails from "../CocktailDetails";

import "./CocktailContent.css";

class CocktailContent extends Component {
    render() {
        return (
            <div className="cocktail-content">
                <CocktailDetails />
            </div>
        );
    }
}

export default CocktailContent;
