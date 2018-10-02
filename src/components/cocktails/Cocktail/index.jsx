import React, { Component } from "react";
import PropTypes from "prop-types";

import Picture from "../../common/Picture";
import Title from "../../common/Title";
import Text from "../../common/Text";
import Icon from "../../common/Icon";
import ActionButton from "../../common/ActionButton";

import "./Cocktail.css";

class Cocktail extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        const summary = [];
        console.log(this.props.value.strCategory);
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

    toggleFavorite = () => {
        this.setState({ favorite: !this.state.favorite });
    };

    renderTitle = () => {
        return (
            <div className="cocktail__title">
                <Title truncate>{this.props.value.strDrink}</Title>
                <div className="cocktail__star">
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
                </div>
            </div>
        );
    };

    renderSummary = () => {
        if (this.state.summary.length === 0) {
            return null;
        }
        return (
            <div className="summary">
                {this.state.summary.map(item => (
                    <div className="summary__item" key={item.type}>
                        <div className="summary__icon">
                            <Icon type={item.type} color={Icon.colors.light} />
                        </div>
                        <Text truncate>{item.name}</Text>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        return (
            <div className="cocktail">
                <div className="coctail__picture">
                    <Picture source={this.props.value.strDrinkThumb} />
                </div>
                <div className="cocktail__info">
                    {this.renderTitle()}
                    {this.renderSummary()}
                </div>
            </div>
        );
    }
}

export default Cocktail;
