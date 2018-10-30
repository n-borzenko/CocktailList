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
        renderLeftButton: PropTypes.func,
        renderRightButton: PropTypes.func,
        renderCloseButton: PropTypes.func,
    };

    renderButton = renderFunction => {
        return renderFunction ? (
            <div className="card__button">{renderFunction()}</div>
        ) : null;
    };

    renderMobileButtons = () => {
        return (
            <div className="card__buttons">
                <div className="card__navigation">
                    {this.renderButton(this.props.renderLeftButton)}
                    {this.renderButton(this.props.renderRightButton)}
                </div>
                {this.renderButton(this.props.renderCloseButton)}
            </div>
        );
    };

    renderDesktopButtons = () => {
        return (
            <Fragment>
                <div className="card__close">
                    {this.renderButton(this.props.renderCloseButton)}
                </div>
                <div className="card__arrows">
                    {this.renderButton(this.props.renderLeftButton)}
                    <div className="card__right-arrow">
                        {this.renderButton(this.props.renderRightButton)}
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
