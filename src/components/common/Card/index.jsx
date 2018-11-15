import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

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
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        closeButton: PropTypes.element,
    };

    renderButton = button => {
        return button ? <div className="card__button">{button}</div> : null;
    };

    renderMobileButtons = () => {
        return (
            <div className="card__buttons">
                <div className="card__navigation">
                    {this.renderButton(this.props.leftButton)}
                    {this.renderButton(this.props.rightButton)}
                </div>
                {this.renderButton(this.props.closeButton)}
            </div>
        );
    };

    renderDesktopButtons = () => {
        return (
            <Fragment>
                <div className="card__close">
                    {this.renderButton(this.props.closeButton)}
                </div>
                <div className="card__arrows">
                    {this.renderButton(this.props.leftButton)}
                    <div className="card__right-arrow">
                        {this.renderButton(this.props.rightButton)}
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
