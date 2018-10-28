import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Picture from "../../common/Picture";
import Title from "../../common/Title";
import Icon from "../../common/Icon";
import ActionButton from "../../common/ActionButton";
import Summary from "../Summary";

import "./Cocktail.css";

class Cocktail extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        to: PropTypes.string.isRequired,
    };

    state = {
        favorite: false,
    };

    toggleFavorite = event => {
        event.preventDefault();
        this.setState({ favorite: !this.state.favorite });
    };

    renderTitle = () => {
        return (
            <span className="cocktail__title">
                <Title truncate>{this.props.value.strDrink}</Title>
                <span className="cocktail__star">
                    <ActionButton
                        size={ActionButton.sizes.full}
                        style={ActionButton.styles.transparent}
                        onClick={this.toggleFavorite}
                    >
                        <Icon
                            type={
                                this.state.favorite
                                    ? Icon.types.favoritesFilled
                                    : Icon.types.favorites
                            }
                        />
                    </ActionButton>
                </span>
            </span>
        );
    };

    render() {
        return (
            <Link to={this.props.to} className="cocktail-link">
                <span className="cocktail">
                    <span className="cocktail__picture">
                        <Picture source={this.props.value.strDrinkThumb} />
                    </span>
                    <span className="cocktail__info">
                        {this.renderTitle()}
                        <Summary value={this.props.value} />
                    </span>
                </span>
            </Link>
        );
    }
}

export default Cocktail;
