import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import ActionButton from "../../common/ActionButton";
import Icon from "../../common/Icon";

import "./RandomCards.css";

const ANIMATION_TIME = 2000;

class RandomCards extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    state = {
        like: false,
        dislike: false,
    };

    dislike = () => {
        this.setState({ dislike: true });
    };

    like = () => {
        this.setState({ like: true });
    };

    render() {
        return (
            <div className="random-cards">
                <div className="random-cards__card">
                    {this.props.children}

                    <CSSTransition
                        in={this.state.dislike}
                        mountOnEnter
                        unmountOnExit
                        onExited={() => this.setState({ dislike: false })}
                        classNames="dislike-animation"
                        timeout={ANIMATION_TIME}
                    >
                        <div className="random-cards__icon random-cards__icon_dislike">
                            <Icon
                                type={Icon.types.dislike}
                                color={Icon.colors.light}
                            />
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={this.state.like}
                        mountOnEnter
                        unmountOnExit
                        onExited={() => this.setState({ like: false })}
                        classNames="like-animation"
                        timeout={ANIMATION_TIME}
                    >
                        <div className="random-cards__icon random-cards__icon_like">
                            <Icon
                                type={Icon.types.favoritesFilled}
                                color={Icon.colors.light}
                            />
                        </div>
                    </CSSTransition>
                </div>

                <div className="random-cards__reaction random-cards__reaction_dislike">
                    <ActionButton
                        size={ActionButton.sizes.full}
                        style={ActionButton.styles.transparent}
                        onClick={this.dislike}
                        disabled={this.state.like || this.state.dislike}
                    >
                        <Icon type={Icon.types.dislike} />
                    </ActionButton>
                </div>

                <div className="random-cards__reaction random-cards__reaction_like">
                    <ActionButton
                        size={ActionButton.sizes.full}
                        style={ActionButton.styles.transparent}
                        onClick={this.like}
                        disabled={this.state.like || this.state.dislike}
                    >
                        <Icon type={Icon.types.favoritesFilled} />
                    </ActionButton>
                </div>
            </div>
        );
    }
}

export default RandomCards;
