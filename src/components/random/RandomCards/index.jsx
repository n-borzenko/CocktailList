import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";

import "./RandomCards.css";

const ANIMATION_TIME = 500;

class RandomCards extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        reaction: PropTypes.func.isRequired,
        favorite: PropTypes.bool.isRequired,
    };

    state = {
        like: false,
        dislike: false,
        cardIsVisible: false,
    };

    componentDidMount() {
        this.setState({ cardIsVisible: true });
    }

    dislike = () => {
        this.setState({ dislike: true });
    };

    like = () => {
        this.setState({ like: true });
    };

    closeCurrentCard = () => {
        this.setState({ cardIsVisible: false });
    };

    requestNextCard = () => {
        this.props.reaction(this.state.like);
        this.setState({
            like: false,
            dislike: false,
            cardIsVisible: true,
        });
    };

    renderIcon = (state, name, icon) => {
        return (
            <CSSTransition
                in={state}
                mountOnEnter
                unmountOnExit
                onEntered={this.closeCurrentCard}
                classNames={`${name}-animation`}
                timeout={ANIMATION_TIME}
            >
                <div
                    className={`random-cards__icon random-cards__icon_${name}`}
                >
                    <Icon type={icon} color={Icon.colors.light} />
                </div>
            </CSSTransition>
        );
    };

    renderIcons = () => {
        return (
            <Fragment>
                {this.renderIcon(
                    this.state.dislike,
                    "dislike",
                    Icon.types.dislike
                )}
                {this.renderIcon(
                    this.state.like,
                    "like",
                    Icon.types.favoritesFilled
                )}
            </Fragment>
        );
    };

    renderReaction = (name, onClick, icon) => {
        return (
            <div
                className={`random-cards__reaction random-cards__reaction_${name}`}
            >
                <ActionButton
                    size={ActionButton.sizes.full}
                    style={ActionButton.styles.transparent}
                    onClick={onClick}
                    disabled={this.state.like || this.state.dislike}
                >
                    <Icon type={icon} />
                </ActionButton>
            </div>
        );
    };

    renderReactions = () => {
        return (
            <Fragment>
                {this.renderReaction(
                    "dislike",
                    this.dislike,
                    Icon.types.dislike
                )}
                {this.renderReaction(
                    "like",
                    this.like,
                    Icon.types.favoritesFilled
                )}
            </Fragment>
        );
    };

    renderNext = () => {
        return (
            <div className="random-cards__reaction random-cards__reaction_next">
                <ActionButton
                    size={ActionButton.sizes.default}
                    onClick={this.closeCurrentCard}
                >
                    <Icon type={Icon.types.arrowRight} />
                </ActionButton>
            </div>
        );
    };

    render() {
        return (
            <div className="random-cards">
                <CSSTransition
                    in={this.state.cardIsVisible}
                    mountOnEnter
                    unmountOnExit
                    onExited={this.requestNextCard}
                    classNames="card-animation"
                    timeout={ANIMATION_TIME}
                >
                    <div className="random-cards__card">
                        {this.props.children}
                        {this.renderIcons()}
                    </div>
                </CSSTransition>
                {this.props.favorite
                    ? this.renderNext()
                    : this.renderReactions()}
            </div>
        );
    }
}

export default RandomCards;
