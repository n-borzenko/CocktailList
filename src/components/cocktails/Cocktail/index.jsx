import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Picture from "../../common/Picture";
import Title from "../../common/Title";
import Icon from "../../common/Icon";
import ActionButton from "../../common/ActionButton";
import Summary from "../../cocktail/Summary";

import "./Cocktail.css";

class Cocktail extends PureComponent {
    static propTypes = {
        value: PropTypes.object.isRequired,
        to: PropTypes.string.isRequired,
        skipFavorites: PropTypes.bool.isRequired,
        toggleFavorite: PropTypes.func,
        favorite: PropTypes.bool,
    };

    static defaultProps = {
        skipFavorites: false,
    };

    toggleFavorite = event => {
        event.preventDefault();
        const { value } = this.props;
        this.props.toggleFavorite(!this.props.favorite, value.idDrink, value);
    };

    renderFavorite = () => {
        if (this.props.skipFavorites) {
            return null;
        }
        return (
            <span className="cocktail__star">
                <ActionButton
                    size={ActionButton.sizes.full}
                    style={ActionButton.styles.transparent}
                    onClick={this.toggleFavorite}
                >
                    <Icon
                        type={
                            this.props.favorite
                                ? Icon.types.favoritesFilled
                                : Icon.types.favorites
                        }
                    />
                </ActionButton>
            </span>
        );
    };

    render() {
        return (
            <Link to={this.props.to} className="cocktail-link">
                <span className="cocktail">
                    <span className="cocktail__content">
                        <span className="cocktail__picture">
                            <Picture source={this.props.value.strDrinkThumb} />
                        </span>
                        <span className="cocktail__info">
                            <span className="cocktail__title">
                                <Title truncate>
                                    {this.props.value.strDrink}
                                </Title>
                                {this.renderFavorite()}
                            </span>
                            <Summary value={this.props.value} />
                        </span>
                    </span>
                </span>
            </Link>
        );
    }
}

export default Cocktail;
