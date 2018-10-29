import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import ActionButton from "../ActionButton";
import Icon from "../Icon";

import "./Card.css";

// parent element must have style:
// {
//     position: relative;
//     height: 100%; (or other fixed or calculated value)
// }

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

    renderMobileButtons = () => {
        return (
            <div className="card__buttons">
                <div className="card__navigation">
                    {this.renderButton(Icon.types.arrowLeft)}
                    {this.renderButton(Icon.types.arrowRight)}
                </div>
                {this.renderButton(Icon.types.remove)}
            </div>
        );
    };

    renderDesktopButtons = () => {
        return (
            <Fragment>
                <div className="card__close">
                    {this.renderButton(Icon.types.remove)}
                </div>
                <div className="card__arrows">
                    {this.renderButton(Icon.types.arrowLeft)}
                    <div className="card__right-arrow">
                        {this.renderButton(Icon.types.arrowRight)}
                    </div>
                </div>
            </Fragment>
        );
    };

    render() {
        return (
            <div className="card-container">
                {this.renderMobileButtons()}
                <div className="card">
                    {this.renderDesktopButtons()}
                    {this.props.children}
                </div>
                <div className="card-container__gap" />
            </div>
        );
    }
}

export default Card;
