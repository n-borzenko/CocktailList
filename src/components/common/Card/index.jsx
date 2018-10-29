import React, { Component } from "react";
import PropTypes from "prop-types";

import ActionButton from "../ActionButton";
import Icon from "../Icon";

import "./Card.css";

class Card extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
    };

    renderButton = type => {
        return (
            <div className="card__button">
                <ActionButton>
                    <Icon type={type} />
                </ActionButton>
            </div>
        );
    };

    render() {
        return (
            <div className="card-container">
                <div className="card">
                    <div className="card__close">
                        {this.renderButton(Icon.types.remove)}
                    </div>
                    <div className="card__arrows">
                        {this.renderButton(Icon.types.arrowLeft)}
                        <div className="card__right-arrow">
                            {this.renderButton(Icon.types.arrowRight)}
                        </div>
                    </div>
                    {this.props.children}
                </div>
                <div className="card-container__gap" />
            </div>
        );
    }
}

export default Card;
