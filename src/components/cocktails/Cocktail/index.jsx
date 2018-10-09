import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Picture from "../../common/Picture";
import Title from "../../common/Title";
import Text from "../../common/Text";
import Icon from "../../common/Icon";
import ActionButton from "../../common/ActionButton";

import "./Cocktail.css";

class Cocktail extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        to: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        const summary = [];
        if (props.value.strCategory) {
            summary.push({
                type: Icon.types.category,
                name: props.value.strCategory,
            });
        }
        if (props.value.strAlcoholic) {
            summary.push({
                type: Icon.types.alcohol,
                name: props.value.strAlcoholic,
            });
        }
        if (props.value.strGlass) {
            summary.push({
                type: Icon.types.glass,
                name: props.value.strGlass,
            });
        }
        if (props.value.strIBA) {
            summary.push({
                type: Icon.types.iba,
                name: props.value.strIBA,
            });
        }
        this.state = { summary };
    }

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
                        style={ActionButton.styles.dark}
                        onClick={this.toggleFavorite}
                    >
                        <Icon
                            type={
                                this.state.favorite
                                    ? Icon.types.starFilled
                                    : Icon.types.star
                            }
                        />
                    </ActionButton>
                </span>
            </span>
        );
    };

    renderSummary = () => {
        if (this.state.summary.length === 0) {
            return null;
        }
        return (
            <span className="summary">
                {this.state.summary.map(item => (
                    <span className="summary__item" key={item.type}>
                        <span className="summary__icon">
                            <Icon type={item.type} color={Icon.colors.light} />
                        </span>
                        <Text truncate>{item.name}</Text>
                    </span>
                ))}
            </span>
        );
    };

    render() {
        return (
            <Link to={this.props.to} className="cocktail-link">
                <span className="cocktail">
                    <span className="coctail__picture">
                        <Picture source={this.props.value.strDrinkThumb} />
                    </span>
                    <span className="cocktail__info">
                        {this.renderTitle()}
                        {this.renderSummary()}
                    </span>
                </span>
            </Link>
        );
    }
}

export default Cocktail;
