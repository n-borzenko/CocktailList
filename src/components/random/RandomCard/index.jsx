import React, { Component } from "react";
import PropTypes from "prop-types";

import "./RandomCard.css";

class RandomCard extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return (
            <div className="random-card">
                <div className="random-card__background" />
                <div className="random-card__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default RandomCard;
