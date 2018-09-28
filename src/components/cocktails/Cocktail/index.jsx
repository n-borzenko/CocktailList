import React, { Component } from "react";
import PropTypes from "prop-types";

import Picture from "../../common/Picture";

import "./Cocktail.css";

class Cocktail extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="cocktail">
                <div className="coctail__picture">
                    <Picture source={this.props.value.strDrinkThumb} />
                </div>
                {this.props.value.strDrink}
            </div>
        );
    }
}

export default Cocktail;
