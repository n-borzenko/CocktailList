import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { push } from "connected-react-router";

import ActionButton from "../ActionButton";
import Icon from "../Icon";
import Card from "../Card";

import "./Details.css";

class Details extends Component {
    static propTypes = {
        getBackURL: PropTypes.func.isRequired,
        previousURL: PropTypes.string.isRequired,
        nextURL: PropTypes.string.isRequired,
        skipArrows: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        previousURL: null,
        nextURL: null,
        skipArrows: false,
    };

    showPrevious = () => {
        this.props.push(this.props.previousURL);
    };

    showNext = () => {
        this.props.push(this.props.nextURL);
    };

    closeCocktailDetails = () => {
        this.props.push(this.props.getBackURL());
    };

    renderLeftButton = () => {
        return !this.props.skipArrows ? (
            <ActionButton
                disabled={!this.props.previousURL}
                onClick={this.showPrevious}
            >
                <Icon type={Icon.types.arrowLeft} />
            </ActionButton>
        ) : null;
    };

    renderRightButton = () => {
        return !this.props.skipArrows ? (
            <ActionButton
                disabled={!this.props.nextURL}
                onClick={this.showNext}
            >
                <Icon type={Icon.types.arrowRight} />
            </ActionButton>
        ) : null;
    };

    renderCloseButton = () => {
        return (
            <ActionButton onClick={this.closeCocktailDetails}>
                <Icon type={Icon.types.remove} />
            </ActionButton>
        );
    };

    render() {
        return (
            <div className="details">
                <div className="details__card">
                    <Card
                        leftButton={this.renderLeftButton()}
                        rightButton={this.renderRightButton()}
                        closeButton={this.renderCloseButton()}
                    >
                        {this.props.children}
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { push }
)(Details);
